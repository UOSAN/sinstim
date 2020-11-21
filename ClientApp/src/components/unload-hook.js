import { useEffect } from 'react';

export const useUnload = (id) => {
    useEffect(() => {
        const handleUnload = () => {
            // const rejectBody = JSON.stringify({
            //     id
            // });
            // const blob = new Blob([rejectBody], { type: 'text/plain; charset=UTF-8' });
            const rejectStatus = navigator.sendBeacon(`/api/Survey/Reject?id=${id}`);

            // Log the data and result
            console.log("sendBeacon: URL = '/api/Survey/Reject'", '; id = ', id, '; status = ', rejectStatus);
        };

        window.addEventListener('unload', handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };
    }, []);
};
