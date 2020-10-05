import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { Container } from './styles';
import { signInRequest } from '../../store/modules/auth/actions';
import { Typography } from 'antd';

const { Title } = Typography;

const SignIn = () => {
  const dispatch = useDispatch();

  const requestSpotifyLogin = useCallback(() => {
    dispatch(signInRequest());
  }, [dispatch]);

  return (
    <Container>
      <div>
        <Title level={3}>
          Clique no botão abaixo para realizar o login :)
        </Title>
        <Button size="large" type="primary" onClick={requestSpotifyLogin}>Fazer login</Button>
      </div>
    </Container>
  );
}

export default SignIn;
