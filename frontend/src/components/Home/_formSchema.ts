import * as yup from 'yup';
export const formSchema = yup.object({
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits.")
      .required("Phone number is required."),
    message: yup
      .string()
      .min(4, "Message must be at least 4 characters.")
      .max(255, "Message cannot exceed 255 characters.")
      .required("Message is required."),
    repeat: yup
      .string()
      .oneOf(["0", "1", "10"], "Repeat must be either '1' or '10'.")
      .required("Repeat is required."),
    delay: yup
      .number()
      .integer("Delay must be an integer.")
      .optional()
      .default(1),
  });
  
  export type FormSchemaT = yup.InferType<typeof formSchema>;