import { useState } from 'react';
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

function App() {
  const [number, setNumber] = useState(
    () => localStorage.getItem('number') || ''
  );
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
      <div
        style={{ position: 'absolute', bottom: 0, right: 0, padding: '1rem' }}
      >
        <Button
          shape="circle"
          type="text"
          icon={<ClearOutlined />}
          onClick={handleClear}
        />
      </div>
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
          <Flex gap="small">
            <Input.OTP value={number} length="4" mask={mask} disabled />
            {mask ? (
              <Button
                shape="circle"
                type="text"
                icon={<EyeTwoTone />}
                onClick={() => setMask(undefined)}
              />
            ) : (
              <Button
                shape="circle"
                type="text"
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
        <Flex vertical gap="small">
          {validationResult.map((e, i) => (
            <Typography.Text key={e.replaceAll(' ', '_').concat(i)}>
              {e}
            </Typography.Text>
          ))}
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
