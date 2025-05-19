import { useEffect, useState } from 'react';

function useFetch<T>(url: string) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const res = await fetch(url);
				if (!res.ok) throw new Error('Network response was not ok');
				const json: T = await res.json();
				if (isMounted) setData(json);
			} catch (err) {
				if (isMounted) setError(err as Error);
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchData();
		return () => {
			isMounted = false;
		};
	}, [url]);

	return { data, loading, error };
}

export default useFetch;
