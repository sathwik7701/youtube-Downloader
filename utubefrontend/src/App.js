import React, { useState } from "react";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import {
  PlayCircleOutlined,
  DownloadOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import Axios from "axios";

const { Title } = Typography;

function App() {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  async function submitForm(values) {
    setLoading(true);
    const data = await Axios.get(
      `http://localhost:4000/download?url=${values.url}`
    );
    setData(data);
    setLoading(false);
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <span>
          <PlayCircleOutlined
            style={{ fontSize: "100px", color: "#FF0000", marginTop: "4rem" }}
          />
        </span>
        <Title
          style={{
            fontWeight: "bold",
            letterSpacing: "8px",
            color: "#282828",
            marginTop: "2rem",
          }}
        >
          NOD YOUTUBE DOWNLOADER
        </Title>
        <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
          <Form form={form} name="dynamic_rule" onFinish={submitForm}>
            <Form.Item {...formItemLayout} name="url" label=" " colon={false}>
              <Input
                size="large"
                placeholder="Paste your video link"
                required={true}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<DownloadOutlined />}
                size="large"
                loading={loading}
                // onClick={() =>setLoading(true)}
              >
                Download
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ marginTop: "3rem" }}>
          {data !== null ? (
            <>
              <iframe
                width="570"
                height="320"
                src={`${data.data.url}`}
                title="video"
              />
              <div
                style={{
                  marginTop: "2rem",
                  paddingLeft: "10rem",
                  paddingRight: "10rem",
                }}
              >
                <Title level={5}>Avilable Formats</Title>
                <br />
                <Row gutter={[10, 20]}>
                  {data?.data.info.map((value, index) => (
                    <Col key={index} xs={24} md={3}>
                      <Button
                        download
                        href={value.url}
                        target="_self"
                        type="primary"
                        ghost
                        icon={
                          value.hasAudio === false ? (
                            <AudioMutedOutlined style={{ color: "#FF0000" }} />
                          ) : null
                        }
                      >
                        {value.mimeType.split(";")[0] + "   "}
                        {value.hasVideo ? value.height + "p" : ""}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          ) : (
            <>
              <Title level={4}>SUBSCRIBE NOD YOUTUBE CHANNEL</Title>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
