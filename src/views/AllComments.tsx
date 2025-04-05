import { useAllComments } from '../storage/ravenbrain.ts';
import Loading from '../common/Loading.tsx';
import ErrorMessage from '../common/ErrorMessage.tsx';
import { RenderCommentTable } from './TeamSummaryReports.tsx';

function AllComments() {
  const { data, error, loading } = useAllComments();

  if (loading || !data) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <section className={'team-report'}>
      <h1>All Comments</h1>
      <RenderCommentTable comments={data} showTeam={true} />
    </section>
  );
}
export default AllComments;
