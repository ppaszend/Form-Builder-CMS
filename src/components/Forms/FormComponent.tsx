"use client"

import FormStep from "@/components/Forms/FormStep/FormStep";
import FormSection from "@/components/Forms/FormSection/FormSection";
import FormRow from "@/components/Forms/FormRow/FormRow";
import FormColumn from "@/components/Forms/FormColumn/FormColumn";
import TextField from "@/components/Forms/Fields/TextField/TextField";
import {FormModel} from "@/models/Form.model";

interface FormProps {
    form: FormModel;
    editable?: boolean;
}

export default function FormComponent(props: FormProps) {
    const onFieldRemoveHandler = () => {

    }

    return <>
        {props.form?.steps.map(step => (
            <FormStep key={step.id}>
                {step.sections.map(section => (

                    <FormSection key={section.id} title={section.props.title}>
                        {section.rows.map(row => (

                            <FormRow key={row.id}>
                                {row.fields.map(field => (

                                    <FormColumn key={field.id} columns={6}>
                                        <TextField
                                            label={field.props.label}
                                            styles={field.styles}
                                            id={field.props.name}
                                            editable={props.editable || false}
                                            position={[step.id, section.id, row.id, field.id]}
                                        />
                                    </FormColumn>

                                ))}
                            </FormRow>

                        ))}
                    </FormSection>

                ))}
            </FormStep>
        ))}
    </>
}