import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { signInCallback } from '../../store/modules/auth/actions';

import { Container } from './styles';

const Callback = () => {
  const dispatch = useDispatch();

  const checkCallbackPayload = useCallback(() => {
    dispatch(signInCallback());
  }, [dispatch]);

  useEffect(() => {
    checkCallbackPayload();
  }, [checkCallbackPayload, dispatch]);

  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}

export default Callback;