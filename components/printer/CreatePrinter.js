import {useState, useEffect} from 'react';
import {Button, Modal, Spin, Form, Input, Checkbox, message} from "antd";
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons';
import { useRouter } from "next/router";

function CreatePrinter () {
    const antIcon = <LoadingOutlined style={{ fontSize: 35, textAlign: 'center'}} spin />;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({name: '',ip: '', status: false});
    const router = useRouter();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0){
                createPrinter();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [isSubmitting])

    const createPrinter = async () => {
        try {
                const res = await fetch(`/api/Printer`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            setIsModalVisible(false);
            setIsSubmitting(false);
            router.push("/");

            if(res.status === 201){
                message.success(`${form.name} created successfully`);
            } else {
                message.error(`Creating ${form.name} failed.`);
            }

        }catch (error) {
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
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return(
        <div>
            <Button
                onClick={showModal}
                icon={<PlusOutlined />}
            >Create Printer</Button>
            < Modal title="Create Printer" visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <div>
                    {
                        isSubmitting
                            ? <Spin indicator={antIcon} style={{display: 'flex', justifyContent: 'center'}}/>
                            : <Form {...layout}
                                    onFinish={handleSubmit}
                                    layout="vertical"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    autoComplete="off"
                            >
                                <div>
                                    <Form.Item
                                        label="Printer name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your Printer name' }]}
                                        onChange={handleChange}
                                    >
                                        <Input name="name"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Printer IP"
                                        name="ip"
                                        rules={[{ required: true, message: 'Please input your Printer IP' }]}
                                        onChange={handleChange}
                                    >
                                        <Input name="ip"/>
                                    </Form.Item>
                                        <Checkbox name="status"
                                                  type="checkbox"
                                                  checked={form.status}
                                                  style={{marginBottom: '15px'}}
                                                  onChange={handleChange}>Active</Checkbox>
                                </div>
                                <Button htmlType="submit" type="primary">Create</Button>
                        </Form>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default CreatePrinter;

