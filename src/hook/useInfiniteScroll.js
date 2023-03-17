import { useState, useEffect } from "react";

const useInfiniteScroll = (callBack) => {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight + 1;
    if (scrollTop + clientHeight >= scrollHeight) {
      setIsFetching(true);
      setPage((prev) => prev + 1);
      callBack();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isFetching]);
  return [page];
};

export default useInfiniteScroll;
