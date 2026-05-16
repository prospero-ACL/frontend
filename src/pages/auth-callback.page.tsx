import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      navigate('/app');
    } else {
      navigate('/login?error=auth_failed');
    }
  }, [searchParams, navigate]);

  return <div>Completing login...</div>;
}

export default OAuthCallback;
