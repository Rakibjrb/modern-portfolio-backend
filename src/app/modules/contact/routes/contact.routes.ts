import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import auth from "../../../middlewares/auth.middlewares";
import { ContactValidation } from "../validations/contact.validations";
import { ContactController } from "../controllers/contact.controllers";

const router = Router();

router.get(
    "/",
    auth("super_admin"),
    ContactController.getAllContacts
);

router.get(
    "/:id",
    auth("super_admin"),
    ContactController.getContactById
);

router.post(
    "/",
    validateRequest(ContactValidation.createContactReq),
    ContactController.createContact
);

router.put(
    "/:id",
    auth("super_admin"),
    validateRequest(ContactValidation.updateContactReq),
    ContactController.updateContact
);

export const ContactRoutes = router;
