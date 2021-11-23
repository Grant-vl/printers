import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {Card, Badge, Modal, message, Col, Row, Breadcrumb, Divider} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import CreatePrinter from '../components/src/CreatePrinter'

export default function Home({printer}) {

    const { Meta } = Card;

    const {confirm} = Modal;

    const router = useRouter();

    const printerCard = (printer) => {
        return(
                <Card
                    hoverable
                    actions={[
                        <DeleteOutlined key="delete" onClick={() => showDeleteConfirm(printer._id)}/>,
                        <Link key="edit" href={`/${printer._id}`}>
                            <EditOutlined />
                        </Link>,
                    ]}

                >
                    <Meta
                        title={printer.name}
                        description={printer.ip}
                    />
                </Card>
        )
    };

    function showDeleteConfirm(printerId) {
        confirm({
            title: 'Are you sure you want to delete this printer?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Changes can not be undone',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deletePrinter(printerId);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deletePrinter = async(printerId) => {
        try {
            const deleted = await fetch(`/api/Printer/${printerId}`, {
                method: "Delete"
            });
            router.push('/')

            if(deleted.status === 200){
                message.success(`Printer deleted successfully`);
            } else {
                message.error(`Printer deletion failed.`);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const gridStyle = {
        width: 300,
        marginLeft: '50px',
        marginTop: '20px',
    };

  return (

        <div style={{maxWidth: '100%', maxHeight: '100%', overflow: 'hidden', paddingBottom: '20px'}}>
            <div style={{display: 'block'}}>
            <div style={{margin: '15px 0 0 30px', display: 'inline-block'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>Printers</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{margin: '15px 30px 0 0', display: 'inline-block',float: 'right'}}>
               <CreatePrinter/>
            </div>
            </div>
            <Divider/>
            <Row gutter={16} >
          {printer.map(printer => {
            return(
                <div key={printer._id} style={gridStyle}>
                    { (printer.status === true) ?
                            <Col className="gutter-row">
                        <Badge.Ribbon text="Active" color="green">
                            { printerCard(printer) }
                        </Badge.Ribbon>
                            </Col>
                            :
                        <Col className="gutter-row">
                        <Badge.Ribbon text="Inactive" color="red">
                            { printerCard(printer) }
                        </Badge.Ribbon>
                        </Col>
                            }
                </div>
                )}
          )}
            </Row>
        </div>
  )
};

Home.getInitialProps = async () => {
  const res = await fetch('https://printers-nextjs.vercel.app/api/Printer');
  // const res = await fetch('http://localhost:3000/api/Printer');
  const { data } = await res.json();

  return { printer: data };
}
