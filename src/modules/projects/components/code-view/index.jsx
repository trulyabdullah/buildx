import { useEffect } from "react";

export const CodeView = ({ code, lang = "javascript" }) => {
	useEffect(() => {
		if (code && lang) Prism.highlightAll();
	}, [code, lang]);

	return (
		<pre className="p-2 bg-transparent border-none rounded-lg m-0 text-xs overflow-x-auto">
			<code className={`language-${lang}`}>{code}</code>
		</pre>
	);
};
