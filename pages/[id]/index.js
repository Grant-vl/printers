import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import Link from "next/link";
import {LoadingOutlined} from '@ant-design/icons';
import {Breadcrumb, Button, Checkbox, Divider, Form, Input, message, Spin} from "antd";
import {useRouter} from "next/router";

const EditPrinter = ({printer}) => {

    const router = useRouter();
    const [form, setForm] = useState({name: printer.name, ip: printer.ip, status: printer.status});
    const antIcon = <LoadingOutlined style={{fontSize: 35, textAlign: 'center'}} spin/>;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updatePrinter();
            } else {
                setIsSubmitting(false);
                message.error(`Please fill all empty fields`);
            }
        }
    },)

    const updatePrinter = async () => {
        try {
                const res = await fetch(`/api/Printer/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            setIsSubmitting(false);
            router.push(`/`)

            if(res.status === 200){
                message.success(`${form.name} updated successfully`);
            } else {
                message.error(`Updating ${form.name} failed.`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = () => {
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "checkbox"? e.target.checked :e.target.value
        })
    }


    const validate = () => {

        console.log("Validate");

        let err = {};

        if (!form.name){
            err.name = 'Printer name is required';
        }

        if (!form.ip){
            err.ip = 'Printer IP is required';
        }

        return err;
    }

    const layout = {
        labelCol: {
            span: 32,
        },
        wrapperCol: {
            span: 64,
        },
    };

    return (
        <div>
            <Breadcrumb style={{margin: '15px 0 0 15px'}}>
                <Breadcrumb.Item>
                    <Link href="/">Printers</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{printer.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Divider orientation="left">Update Printer</Divider>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                    isSubmitting
                        ? <Spin indicator={antIcon}/>
                        : <Form {...layout}
                                onFinish={handleSubmit}
                                layout="vertical"
                                initialValues={{
                                    remember: true,
                                }}
                                autoComplete="off"
                                style={{minWidth: '50%'}}
                        >
                            <div>
                                <Form.Item
                                    label="Printer name"
                                    name="name"
                                    rules={[{ required: false }]}
                                    onChange={handleChange}
                                >
                                    <Input name="name" placeholder={form.name}/>
                                </Form.Item>
                                <Form.Item
                                    label="Printer IP"
                                    name="ip"
                                    rules={[{ required: false }]}
                                    onChange={handleChange}
                                >
                                    <Input name="ip" placeholder={form.ip}/>
                                </Form.Item>
                                <Checkbox name="status"
                                          type="checkbox"
                                          checked={form.status}
                                          style={{marginBottom: '15px'}}
                                          onChange={handleChange}>Active</Checkbox>
                            </div>
                                <Button htmlType="submit" type="primary">Update</Button>
                        </Form>
                }

            </div>
        </div>
    )
};

EditPrinter.getInitialProps = async ({query: { id }}) => {
    const res = await fetch(`https://printers-nextjs.vercel.app/api/Printer/${id}`)
    // const res = await fetch(`http://localhost:3000/api/Printer/${id}`);
    const data = await res.json();

    return { printer: data.body }
}

export default EditPrinter;
