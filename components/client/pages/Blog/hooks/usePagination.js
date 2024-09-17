import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

export default function usePagination(posts, postPerView) {
	const [currentPage, setCurrentPage] = useState(1)

	const count = useMemo(() => {
		return Math.ceil(posts.length / postPerView)
	}, [posts]);

	const renderData = useMemo(() => {
		const begin = (currentPage - 1) * postPerView;
		const end = begin + postPerView;
		return posts.slice(begin, end);
	}, [currentPage])

	const next = () => {
		setCurrentPage(currentPage => Math.min(currentPage + 1, count));
	}

	const prev = () => {
		setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
	}

	const jump = (page) => {
		const pageNumber = Math.max(1, page);
		setCurrentPage(currentPage => Math.min(pageNumber, count));
	}

	return {
		currentPage,
		count,
		renderData,
		next,
		prev,
		jump
	}
}