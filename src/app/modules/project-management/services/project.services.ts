import httpStatus from "http-status";
import { FilterQuery } from "mongoose";
import AppError from "../../../errors/AppError";
import { IProject } from "../interfaces/project.interface";
import { Project } from "../schemas/project.schema";
import { TMeta } from "../../../utils/sendResponse";

const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const createProject = async (payload: Partial<IProject>): Promise<IProject> => {
    const slug = payload.slug ? payload.slug.toLowerCase().trim() : generateSlug(payload.title as string);

    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
        throw new AppError(httpStatus.CONFLICT, "Project with this slug already exists!");
    }

    const projectData = {
        ...payload,
        slug,
    };

    const result = await Project.create(projectData);
    return result;
};

const getAllProjects = async (
    query: Record<string, unknown>
): Promise<{ data: IProject[]; meta: TMeta }> => {
    const { category, featured, search, page, limit, sort } = query;

    const filter: FilterQuery<IProject> = {};

    if (category) {
        filter.category = category as string;
    }

    if (featured !== undefined) {
        filter.featured = featured === "true" || featured === true;
    }

    if (search) {
        const searchRegex = new RegExp(search as string, "i");
        filter.$or = [
            { title: searchRegex },
            { shortDescription: searchRegex },
            { fullDescription: searchRegex },
            { category: searchRegex },
            { technologies: searchRegex },
        ];
    }

    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    let sortOptions: Record<string, 1 | -1> = { order: 1, createdAt: -1 };
    if (sort === "createdAt_desc") {
        sortOptions = { createdAt: -1 };
    } else if (sort === "createdAt_asc") {
        sortOptions = { createdAt: 1 };
    }

    const [data, total] = await Promise.all([
        Project.find(filter).sort(sortOptions).skip(skip).limit(limitNumber),
        Project.countDocuments(filter),
    ]);

    const totalPages = total > 0 ? Math.ceil(total / limitNumber) : 0;

    return {
        data,
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages,
        },
    };
};

const getProjectBySlug = async (slug: string): Promise<IProject> => {
    const project = await Project.findOne({ slug: slug.toLowerCase().trim() });
    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, "Project not found!");
    }
    return project;
};

const updateProject = async (
    id: string,
    payload: Partial<IProject>
): Promise<IProject | null> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, "Project not found!");
    }

    if (payload.slug || payload.title) {
        const newSlug = payload.slug
            ? payload.slug.toLowerCase().trim()
            : generateSlug(payload.title as string);

        if (newSlug !== project.slug) {
            const slugExists = await Project.findOne({ slug: newSlug, _id: { $ne: id } });
            if (slugExists) {
                throw new AppError(httpStatus.CONFLICT, "Project with this slug already exists!");
            }
            payload.slug = newSlug;
        }
    }

    if (payload.url) {
        payload.url = {
            ...project.url,
            ...payload.url,
        };
    }

    const updatedProject = await Project.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updatedProject;
};

const deleteProject = async (id: string): Promise<IProject | null> => {
    const project = await Project.findById(id);
    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, "Project not found!");
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    return deletedProject;
};

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    updateProject,
    deleteProject,
};
