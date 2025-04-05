import { getAllTournaments } from '../storage/local.ts';
import { useState } from 'react';
import Loading from '../common/Loading.tsx';
import {
  useTeamsForTournament,
  useTournamentReport,
} from '../storage/ravenbrain.ts';
import ErrorMessage from '../common/ErrorMessage.tsx';
import { Tournament } from '../types/Tournament.ts';

export type TournamentReportCell = {
  colId: string;
  value: string | number | undefined;
};
export type TournamentReportRow = {
  values: TournamentReportCell[];
};
export type TournamentReportTable = {
  tournament: Tournament;
  headerRows: TournamentReportRow[];
  dataRows: TournamentReportRow[];
  footerRows: TournamentReportRow[];
};

function RenderCell(cell: TournamentReportCell) {
  let classes = '';
  switch (cell.colId) {
    case 'AUTO-coral-pickup-floor':
    case 'AUTO-coral-pickup-left':
    case 'AUTO-coral-pickup-right':
    case 'AUTO-coral-pickup-drop':
      classes += 'auto-coral-pickup';
      break;
    case 'TELEOP-coral-pickup-floor':
    case 'TELEOP-coral-pickup-left':
    case 'TELEOP-coral-pickup-right':
    case 'TELEOP-coral-pickup-drop':
      classes += 'teleop-coral-pickup';
      break;
    case 'AUTO-coral-score-l1':
    case 'AUTO-coral-score-l2':
    case 'AUTO-coral-score-l3':
    case 'AUTO-coral-score-l4':
    case 'AUTO-coral-score-miss':
      classes += 'auto-coral-score';
      break;
    case 'TELEOP-coral-score-l1':
    case 'TELEOP-coral-score-l2':
    case 'TELEOP-coral-score-l3':
    case 'TELEOP-coral-score-l4':
    case 'TELEOP-coral-score-miss':
    case 'TELEOP-coral-score-cycles':
    case 'TELEOP-coral-score-scores':
      classes += 'teleop-coral-score';
      break;
    case 'TELEOP-algae-remove':
    case 'TELEOP-algae-pluck':
    case 'TELEOP-algae-drop':
    case 'TELEOP-algae-net':
    case 'TELEOP-algae-processor':
      classes += ' teleop-algae';
      break;
    case 'AUTO-algae-remove':
    case 'AUTO-algae-pluck':
    case 'AUTO-algae-drop':
    case 'AUTO-algae-net':
    case 'AUTO-algae-processor':
      classes += 'auto-algae';
      break;
    case 'DEFENCE-started':
    case 'DEFENCE-played':
    case 'DEFENCE-time':
    case 'DEFENCE-effective':
      classes += 'defence';
      break;
    case 'ENDGAME':
      classes += 'endgame-cell';
      break;
    case 'PENALTY-pin':
    case 'PENALTY-zone':
    case 'PENALTY-contact':
    case 'PENALTY-field-damage':
    case 'PENALTY-too-many-pieces':
    case 'PENALTY-other':
      classes += 'penalties';
      break;
    case 'COMMENT':
      classes += 'comments';
      classes += ' short-text';
      break;
    case 'COMMENT-stars':
      classes += 'comments';
      break;
  }
  switch (cell.value) {
    case 'Y':
      classes += ' yes';
      break;
    case 'N':
      classes += ' no';
      break;
  }

  return (
    <td key={cell.colId} className={classes}>
      <div>{cell.value}</div>
    </td>
  );
}

function RenderHeaderCell(cell: TournamentReportCell) {
  let classes = '';
  if (cell.colId == 'COMMENT') {
    classes += ' short-text';
  }
  return (
    <td key={cell.colId} className={classes}>
      <div>{cell.value}</div>
    </td>
  );
}

function TournamentReports() {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(
    null,
  );
  const tournaments = getAllTournaments();

  if (tournaments.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <h2>Tournament Reports</h2>
      <div className={'tournament-select'}>
        <p>Show data for tournament:</p>
        <label>
          <select
            onChange={e => {
              setSelectedTournament(e.target.value);
            }}
          >
            <option value={''}> -- select --</option>
            {tournaments.map(t => {
              return (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div>
        {selectedTournament && <SelectTeam tournamentId={selectedTournament} />}
      </div>
    </>
  );
}
function SelectTeam(props: { tournamentId: string }) {
  const { tournamentId } = props;
  const { data, loading, error, refresh } = useTeamsForTournament(tournamentId);
  const [team, setTeam] = useState<number | null>(null);

  if (loading || !data) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div>
      <label>
        <select
          onChange={e => {
            // @ts-ignore
            setTeam(e.target.value);
            refresh();
          }}
        >
          <option value={''}> -- select --</option>
          {data.map(t => {
            return (
              <option key={t} value={t}>
                {t}
              </option>
            );
          })}
        </select>
      </label>
      {tournamentId && team && (
        <section>
          <p>
            Showing data for {team} at {tournamentId}. This is a first draft
            report. Please provide feedback during the day and it will be
            refined.
          </p>
          <ShowTournamentReport tournamentId={tournamentId} teamNumber={team} />
        </section>
      )}
    </div>
  );
}

function ShowTournamentReport(props: {
  tournamentId: string;
  teamNumber: number;
}) {
  const { tournamentId: tourn, teamNumber: team } = props;
  const { data, error, loading } = useTournamentReport(tourn, team);

  if (loading || !data) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return <RenderTournamentReportTable data={data} />;
}
export function RenderTournamentReportTable(props: {
  data: TournamentReportTable;
}) {
  const { data } = props;
  if (!data || !data.dataRows || data.dataRows.length === 0) {
    return null;
  }
  return (
    <section className={'report'}>
      <h4>{data.tournament.name}</h4>
      <table>
        <thead>
          <RenderHeader rows={data.headerRows} />
        </thead>
        <tbody>
          <RenderBody rows={data.dataRows} />
        </tbody>
        <tfoot>
          <RenderFooter rows={data.footerRows} />
        </tfoot>
      </table>
    </section>
  );
}

function RenderHeader(props: { rows: TournamentReportRow[] | null }) {
  if (!props.rows) {
    return null;
  }
  return props.rows.map(r => {
    if (r.values) {
      return (
        <th>
          {r.values.map(cell => {
            return RenderHeaderCell(cell);
          })}
        </th>
      );
    } else {
      return null;
    }
  });
}

function RenderFooter(props: { rows: TournamentReportRow[] | null }) {
  if (!props.rows) return null;
  return props.rows.map(r => {
    if (r.values) {
      return (
        <tr>
          {r.values.map(cell => {
            return RenderCell(cell);
          })}
        </tr>
      );
    } else {
      return null;
    }
  });
}

function RenderBody(props: { rows: TournamentReportRow[] | null }) {
  if (!props.rows) return null;
  return props.rows.map((r, idx) => {
    if (r.values) {
      return (
        <tr key={idx}>
          {r.values.map(cell => {
            return RenderCell(cell);
          })}
        </tr>
      );
    } else {
      return null;
    }
  });
}

export default TournamentReports;
