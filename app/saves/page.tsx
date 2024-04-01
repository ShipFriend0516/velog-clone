import SaveArticlePreview from "../components/Save-Article-Preview";

const SavePostPage = () => {
  return (
    <section className="max-w-5xl mx-auto p-20">
      <h2 className="text-5xl font-bold mb-16">임시 글 목록</h2>
      <div className="flex flex-col justify-start gap-5">
        <SaveArticlePreview id={5} title={"테스트용 임시저장 글"} content={'반갑습니다.'} saveTime={new Date().getTime()} />
        <SaveArticlePreview id={1} title={"Intersection Observer API 공부"} content={'Intersection Observer API 는 사용자가 보는 지점(뷰포트)에 특정 요소가 들어오거나 나갈 때 콜백함수를 코드에 등록할 수 있게하는 Web API이다.'}  saveTime={1400000} />
      </div>
    </section>
  );
};

export default SavePostPage;
