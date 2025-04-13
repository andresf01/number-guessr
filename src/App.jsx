import { useState, Fragment } from 'react';
import {
  Flex,
  Card,
  Button,
  Input,
  ConfigProvider,
  theme,
  Typography,
} from 'antd';
import {
  EyeTwoTone,
  EyeInvisibleTwoTone,
  ClearOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';

function App() {
  const [number, setNumber] = useState(
    () => localStorage.getItem('number') || ''
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [validationResult, setValidationResult] = useState([]);
  const [mask, setMask] = useState('*');

  const handleAddMyNumber = () => {
    const n = `${inputVal}`;
    setNumber(n);
    localStorage.setItem('number', n);
    setInputVal('');
  };

  const handleVerify = () => {
    const val = inputVal;
    setInputVal('');

    let total = 0,
      right = 0;

    for (let i = 0; i < number.length; i++) {
      if (val.includes(number[i])) {
        total += 1;
      }
      console.log(number[i], val[i]);
      if (number[i] === val[i]) {
        right += 1;
      }
    }

    setValidationResult((prev) => [`${val} ${total} - ${right}`, ...prev]);
  };

  const handleClear = () => {
    setNumber('');
    localStorage.removeItem('number');
    setValidationResult([]);
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        // algorithm: 'dark',
        token: {
          colorPrimary: '#ED4192',
        },
      }}
    >
      {number && (
        <div
          style={{ position: 'absolute', bottom: 0, right: 0, padding: '1rem' }}
        >
          <Button
            shape="circle"
            type="text"
            icon={<ClearOutlined />}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleClear}
        onCancel={() => setIsModalOpen(false)}
      >
        <p>Do you want to clear the number?</p>
      </Modal>
      <Flex vertical align="center" gap="middle">
        <Typography.Title level={1}>Number Guessr</Typography.Title>
        {!number && (
          <Card
            title="My Number"
            bordered={false}
            style={{ minWidth: '300px' }}
          >
            <Flex vertical gap="middle">
              <Input.OTP
                length={4}
                onChange={setInputVal}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Button onClick={handleAddMyNumber} htmlType="button">
                Add
              </Button>
            </Flex>
          </Card>
        )}
        {number && (
          <Flex gap="small" style={{ position: 'relative' }}>
            <Input.OTP value={number} length="4" mask={mask} disabled />
            {mask ? (
              <Button
                shape="circle"
                type="text"
                style={{ position: 'absolute', right: '-40px' }}
                icon={<EyeTwoTone />}
                onClick={() => setMask(undefined)}
              />
            ) : (
              <Button
                shape="circle"
                type="text"
                style={{ position: 'absolute', right: '-40px' }}
                icon={<EyeInvisibleTwoTone />}
                onClick={() => setMask('*')}
              />
            )}
          </Flex>
        )}
        {number && (
          <Card title="Guess" bordered={false} style={{ minWidth: '300px' }}>
            <Flex vertical gap="middle">
              <Input.OTP
                value={inputVal}
                length={4}
                onChange={setInputVal}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Button
                onClick={handleVerify}
                htmlType="button"
                disabled={inputVal.length < 4}
              >
                Verify
              </Button>
            </Flex>
          </Card>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '14px 1fr',
            columnGap: '1rem',
            rowGap: '.5rem',
          }}
        >
          {validationResult.map((e, i) => (
            <Fragment key={i}>
              <Typography.Text disabled>
                {validationResult.length - i}.
              </Typography.Text>
              <Typography.Text style={{ letterSpacing: '1px' }}>
                {e}
              </Typography.Text>
            </Fragment>
          ))}
        </div>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
