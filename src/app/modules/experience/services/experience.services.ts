import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import {
  IAcademicExperience,
  IProfessionalExperience,
} from "../interfaces/experience.interface";
import {
  AcademicExperience,
  ProfessionalExperience,
} from "../schemas/experience.schema";

const getExperiences = async (): Promise<{
  professional: IProfessionalExperience[];
  academic: IAcademicExperience[];
}> => {
  const [professional, academic] = await Promise.all([
    ProfessionalExperience.find().sort({ startDate: -1 }),
    AcademicExperience.find().sort({ startDate: -1 }),
  ]);

  return {
    professional,
    academic,
  };
};

const createProfessionalExperience = async (
  payload: Partial<IProfessionalExperience>,
): Promise<IProfessionalExperience> => {
  const result = await ProfessionalExperience.create(payload);
  return result;
};

const updateProfessionalExperience = async (
  id: string,
  payload: Partial<IProfessionalExperience>,
): Promise<IProfessionalExperience | null> => {
  const experience = await ProfessionalExperience.findById(id);
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Professional experience record not found!");
  }

  const updatedExperience = await ProfessionalExperience.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedExperience;
};

const deleteProfessionalExperience = async (
  id: string,
): Promise<IProfessionalExperience | null> => {
  const experience = await ProfessionalExperience.findById(id);
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Professional experience record not found!");
  }

  const deletedExperience = await ProfessionalExperience.findByIdAndDelete(id);
  return deletedExperience;
};

const createAcademicExperience = async (
  payload: Partial<IAcademicExperience>,
): Promise<IAcademicExperience> => {
  const result = await AcademicExperience.create(payload);
  return result;
};

const updateAcademicExperience = async (
  id: string,
  payload: Partial<IAcademicExperience>,
): Promise<IAcademicExperience | null> => {
  const experience = await AcademicExperience.findById(id);
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic experience record not found!");
  }

  const updatedExperience = await AcademicExperience.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedExperience;
};

const deleteAcademicExperience = async (
  id: string,
): Promise<IAcademicExperience | null> => {
  const experience = await AcademicExperience.findById(id);
  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic experience record not found!");
  }

  const deletedExperience = await AcademicExperience.findByIdAndDelete(id);
  return deletedExperience;
};

export const ExperienceService = {
  getExperiences,
  createProfessionalExperience,
  updateProfessionalExperience,
  deleteProfessionalExperience,
  createAcademicExperience,
  updateAcademicExperience,
  deleteAcademicExperience,
};

