import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/**
 * Convert a record of files to a tree structure.
 * @param files - Record of file paths to content
 * @returns Tree structure for TreeView component
 *
 * @example
 * Input: { "src/Button.tsx": "...", "README.md": "..." }
 * Output: [["src", "Button.tsx"], "README.md"]
 */
export function convertFilesToTreeItems(files) {
	const tree = {};
	const sortedPaths = Object.keys(files).sort();

	for (const filePath of sortedPaths) {
		const parts = filePath.split("/");
		let current = tree;

		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (!current[part]) {
				current[part] = {};
			}
			current = current[part];
		}

		const fileName = parts[parts.length - 1];
		current[fileName] = null; // null indicates it's a file
	}

	function convertNode(node, name) {
		const entries = Object.entries(node);

		if (entries.length === 0) {
			return name || "";
		}

		const children = [];

		for (const [key, value] of entries) {
			if (value === null) {
				children.push(key);
			} else {
				const subTree = convertNode(value, key);
				if (Array.isArray(subTree)) {
					children.push([key, ...subTree]);
				} else {
					children.push([key, subTree]);
				}
			}
		}

		return children;
	}

	const result = convertNode(tree);
	return Array.isArray(result) ? result : [result];
}
