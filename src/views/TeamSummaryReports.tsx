import { QuickComment } from '../types/QuickComment.ts';
import { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage.tsx';
import { useTeamReport } from '../storage/ravenbrain.ts';
import Loading from '../common/Loading.tsx';
import { RenderTournamentReportTable } from './TournamentReports.tsx';

function TeamSummaryReports() {
  const [team, setTeam] = useState<number | null>(null);
  const [go, setGo] = useState<boolean>(false);

  return (
    <section className={'team-report'}>
      <h2>Team Reports</h2>
      <p>
        This is the future home of our awesome team summary report! For now, you
        just get comments - if any have been entered (you have to start
        somewhere).
      </p>
      <p>Please enter a team number: </p>
      <input
        type={'text'}
        onChange={e => {
          // @ts-ignore
          setTeam(e.target.value);
          setGo(false);
        }}
      />
      {team && !go && (
        <button className={'go-button'} onClick={() => setGo(true)}>
          Show Report
        </button>
      )}
      {team && go && <ShowTeamReport teamId={team} />}
    </section>
  );
}

function ShowTeamReport(props: { teamId: number }) {
  const { data, loading, error } = useTeamReport(props.teamId);
  if (loading || !data) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  if (data.comments === undefined) {
    return <p>No comments about this team.</p>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className={'team-report-date'}>Date & Time</th>
            <th className={'team-report-team'}>Team Member</th>
            <th className={'team-report-comment'}>Quick Comment</th>
          </tr>
        </thead>
        <tbody>
          {data.comments?.map((qc: QuickComment) => {
            return (
              <tr key={qc.timestamp.toString() + qc.name}>
                <td>{qc.timestamp.toString()}</td>
                <td>
                  {qc.name} ({qc.role})
                </td>
                <td>{qc.quickComment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {data?.tournamentReports?.map((tournamentReport, index) => {
        return (
          <>
            <RenderTournamentReportTable data={tournamentReport} key={index} />
          </>
        );
      })}
    </div>
  );
}
export default TeamSummaryReports;
