import { useState } from "react";

export default function useForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    mobile: "",
    apply_type: "",
    resource: "",
    other: "",
  });

  const [isValid, setIsValid] = useState({
    nickname: false,
    email: false,
    mobile: false,
    apply_type: false,
    resource: false,
    other: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let isAllValid = false;
    let isValidCopy = { ...isValid };

    for (const [key, value] of Object.entries(formData)) {
      if (key === "other") break;
      if (value.trim().length === 0) {
        isValidCopy[key] = true;
        isAllValid = true;
      } else {
        isValidCopy[key] = false;
      }
    }
    setIsValid(isValidCopy);

    if (isAllValid) return;

    let dataTemplate = `
      nickname:  ${formData.nickname}
      email:  ${formData.email}
      mobile:  ${formData.mobile}
      apply_type:  ${formData.apply_type}
      resource:  ${formData.resource}
      other:  ${formData.other}
    `;
    alert(dataTemplate);

    window.location.reload();
  };

  return {
    handleFormSubmit,

    formData,
    setFormData,
    isValid,
  };
}
