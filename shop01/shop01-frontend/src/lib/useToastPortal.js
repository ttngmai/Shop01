import uuid from "./uuid";
import { useState, useEffect } from 'react';

const useToastPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${uuid()}`);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    div.style = 'position: fixed; z-index: 10; top: 4rem; right: 10px;';
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);

    return () => document.getElementsByTagName('body')[0].removeChild(div);
  }, [portalId]);

  return { loaded, portalId };
}

export default useToastPortal;