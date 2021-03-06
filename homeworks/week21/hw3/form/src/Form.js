import styled from "styled-components";
import useForm from "./useForm";
import { useState } from "react";

const FormContent = styled.form`
  width: 645px;
  background: white;
  border-top: solid 12px #fad312;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 54px 42px;
`;

const Title = styled.h1``;

const EventDescription = styled.div`
  line-height: 2.1em;
  font-size: 12px;
`;

const Notice = styled.div`
  color: red;
  line-height: 4.2em;
  font-size: 14px;
`;

const Question = styled.div`
  padding: 20px 0px;
`;

const QuestionTitle = styled.div`
  font-weight: bold;

  ${(props) =>
    props.required &&
    `
    &:after {
      content: "*";
      color: red;
      margin-left: 5px;
    }
    `}
`;

const QuestionInput = styled.input`
  margin: 15px 8px 0px 0px;

  ${(props) =>
    props.type === "radio" &&
    `
  cursor: pointer;
  `}
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 8px 0px 10px;
  position: absolute;
`;

const QuestionOption = styled.label`
  margin-top: 8px 0px 15px;
`;

const QuestionLabel = styled.label`
  line-height: 2.5em;
  font-size: 12px;
  cursor: pointer;
  font-weight: normal;
`;

const QuestionDescription = styled.div`
  display: none;

  ${(props) =>
    props.showDescription &&
    `
  display: block;
  font-size: 12px;
  margin: 10px 0px 0px;
  font-weight: bold;
  `}
`;

const Button = styled.button`
  padding: 13px 30px;
  background: #fad312;
  border: 0px;
  border-radius: 3px;
  width: 98px;
  text-align: center;
  margin: 30px 0px 20px 0px;
  font-size: 12px;
  transition: transform 0.2s;
  cursor: pointer;
  font-weight: bold;

  &::hover {
    transform: scale(1.1);
  }
`;

const Warning = styled.div`
  font-size: 12px;
`;

const QuestionBlock = ({
  title,
  required,
  showDescription,
  placeholder,
  type,
  name,
  formData,
  setFormData,
  errorMessage,
  isValid,
}) => {
  const [inputValue, setInputValue] = useState(formData[name]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const className = e.target.name;
    setInputValue(newValue);
    setFormData({
      ...formData,
      [className]: newValue,
    });
  };

  return (
    <Question>
      <QuestionTitle required={required}>{title}</QuestionTitle>
      <QuestionDescription showDescription={showDescription}>
        ????????????????????????
      </QuestionDescription>
      <QuestionInput
        placeholder={placeholder}
        type={type}
        name={name}
        value={inputValue}
        onChange={handleInputChange}
      />
      {isValid[name] && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Question>
  );
};

const RadioQuestionBlock = ({
  required,
  title,
  type,
  name,
  formData,
  setFormData,
  errorMessage,
  isValid,
}) => {
  const handleRadioToggle = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Question>
      <QuestionTitle required={required}>{title}</QuestionTitle>
      <QuestionOption>
        <QuestionLabel>
          <QuestionInput
            type={type}
            name={name}
            value="bed"
            id="bed"
            onClick={handleRadioToggle}
          />
          ??????????????????????????????
        </QuestionLabel>
        <br />
        <QuestionLabel>
          <QuestionInput
            type={type}
            name={name}
            value="floor"
            id="floor"
            onClick={handleRadioToggle}
          />
          ?????????????????????????????????
        </QuestionLabel>
      </QuestionOption>
      {isValid[name] && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Question>
  );
};

export default function Form() {
  const {
    formData,
    setFormData,
    isValid,

    handleFormSubmit,
  } = useForm();

  return (
    <FormContent onSubmit={handleFormSubmit}>
      <Title>???????????????????????????</Title>
      <EventDescription>
        ???????????????2020/12/10 ~ 2020/12/11
        <br />
        ???????????????????????????????????????????????????1???
      </EventDescription>
      <Notice>* ??????</Notice>
      <QuestionBlock
        title="??????"
        required={true}
        placeholder="????????????"
        type="text"
        name="nickname"
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        errorMessage="???????????????"
      />
      <QuestionBlock
        title="????????????"
        required={true}
        placeholder="??????????????????"
        type="email"
        name="email"
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        errorMessage="?????????????????????"
      />
      <QuestionBlock
        title="????????????"
        required={true}
        placeholder="??????????????????"
        type="number"
        name="mobile"
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        errorMessage="?????????????????????"
      />

      <RadioQuestionBlock
        required={true}
        title="????????????"
        type="radio"
        name="apply_type"
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        errorMessage="???????????????"
      />

      <QuestionBlock
        title="???????????????????????????"
        required={true}
        placeholder="????????????"
        type="text"
        name="resource"
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
        errorMessage="???????????????"
      />
      <QuestionBlock
        title="??????"
        required={false}
        showDescription={true}
        placeholder="????????????"
        type="text"
        name="other"
        formData={formData}
        setFormData={setFormData}
        isValid={isValid}
      />
      <Button>??????</Button>
      <Warning>???????????????????????????????????????</Warning>
    </FormContent>
  );
}
