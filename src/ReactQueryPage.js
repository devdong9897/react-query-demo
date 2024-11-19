import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// 1. useQuery는 컴포넌트가 시작할 때 바로 실행된다.

const ReactQueryPage = () => {
  // useQuery: API 데이터를 가져오거나 캐싱하고, 상태 관리를 자동으로 해주는 기능.
  // 서버에서 데이터를 불러오는 작업을 쉽게 처리할 수 있다. 예를 들어,
  // 게시글 목록을 가져오는 API를 호출할 때 useQuery를 사용하면,
  // 데이터가 로딩 중일 때 로딩 상태를 관리하고, 데이터가 성공적으로 로드되면
  // 그 데이터를 저장하고 화면에 표시하는 작업을 자동으로 처리

  const fetchPost = (queryData) => {
    const id = queryData.queryKey[1];
    return axios.get(`http://localhost:3004/posts/${id}`);
  };
  // api호출을 통해 받은 데이터
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["posts", 1], // 데이터 요청에 대한 고유한 식별자
    queryFn: fetchPost, // 내가 호출하고 싶은 api ( 데이터를 가져올 함수)
    retry: 1,
    // staleTime: 60000, // 데이터를 새로 요청하지 않고 캐시된 데이터를 계속 사용할지를 정의하는 것. // 자주 호출할 필요가 없는 api

    // // 캐쉬 수명조절... 캐쉬도 메모리공간을 차지하기 때문에 주기적으로 비워줄 필요가있다.
    // gcTime: 10000, // 설정하지 않으면 기본값이 5분 // staleTime < gcTime
    select: (data) => {
      return data.data;
    },
    enabled: false,
  });
  console.log("ddd", data, isLoading);
  console.log("error", isError, error);

  if (isLoading) {
    return <h1>...Loading</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      {/* {data?.map((item) => (
        <div>{item.title}</div>
      ))} */}
      <button onClick={refetch}>post리스트 다시 들고오기</button>
    </div>
  );
};

export default ReactQueryPage;
