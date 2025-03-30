import { getAllTournaments } from '../storage/util.ts';
import { useState } from 'react';
import Loading from '../common/Loading.tsx';

type Cell = {
  colId: string;
  value: string | number | undefined;
};
type Row = {
  values: Cell[];
};
type Table = {
  headerRows: Row[];
  dataRows: Row[];
  footerRows: Row[];
};

const exampleHeaderRow: Cell[] = [
  { colId: 'INFO', value: 1310 },
  { colId: 'COMMENT', value: 'Comments' },
  { colId: 'INFO', value: 'Mistake' },
  { colId: 'INFO', value: 'Auto Start' },
  { colId: 'INFO', value: 'Preloaded' },
  { colId: 'INFO', value: 'Leave Starting Zone' },
  { colId: 'AUTO-algae', value: 'Remove Algae' },
  { colId: 'AUTO-algae', value: 'Pluck Algae' },
  { colId: 'AUTO-algae', value: 'Pickup Algae' },
  { colId: 'AUTO-algae', value: 'Drop Algae' },
  { colId: 'AUTO-algae', value: 'Score Net' },
  { colId: 'AUTO-algae', value: 'Score Processor' },
  { colId: 'AUTO-coral-pickup', value: 'Pickup Floor' },
  { colId: 'AUTO-coral-pickup', value: 'Pickup Left' },
  { colId: 'AUTO-coral-pickup', value: 'Pickup Right' },
  { colId: 'AUTO-coral-pickup', value: 'Drop Coral' },
  { colId: 'AUTO-coral-score', value: 'Score L1' },
  { colId: 'AUTO-coral-score', value: 'Score L2' },
  { colId: 'AUTO-coral-score', value: 'Score L3' },
  { colId: 'AUTO-coral-score', value: 'Score L4' },
  { colId: 'AUTO-coral-score', value: 'Miss Reef' },
  { colId: 'TELEOP-algae', value: 'Remove Algae' },
  { colId: 'TELEOP-algae', value: 'Pluck Algae' },
  { colId: 'TELEOP-algae', value: 'Pickup Algae' },
  { colId: 'TELEOP-algae', value: 'Drop Algae' },
  { colId: 'TELEOP-algae', value: 'Score Net' },
  { colId: 'TELEOP-algae', value: 'Score Processor' },
  { colId: 'TELEOP-coral-pickup', value: 'Pickup Floor' },
  { colId: 'TELEOP-coral-pickup', value: 'Pickup Left' },
  { colId: 'TELEOP-coral-pickup', value: 'Pickup Right' },
  { colId: 'TELEOP-coral-pickup', value: 'Drop Coral' },
  { colId: 'TELEOP-coral-score', value: 'Score L1' },
  { colId: 'TELEOP-coral-score', value: 'Score L2' },
  { colId: 'TELEOP-coral-score', value: 'Score L3' },
  { colId: 'TELEOP-coral-score', value: 'Score L4' },
  { colId: 'TELEOP-coral-score', value: 'Miss Reef' },
  { colId: 'TELEOP-coral-score', value: 'Total Coral Cycles' },
  { colId: 'TELEOP-coral-score', value: 'Total Coral Scores' },
  { colId: 'ENDGAME', value: 'Endgame' },
  { colId: 'PENALTY', value: 'Pin' },
  { colId: 'PENALTY', value: 'Zone Violation' },
  { colId: 'PENALTY', value: 'Off-Limit Contact' },
  { colId: 'PENALTY', value: 'Field Damage' },
  { colId: 'PENALTY', value: 'Too Many Game Pieces' },
  { colId: 'PENALTY', value: 'Other' },
  { colId: 'INFO', value: 'Auto RP' },
  { colId: 'INFO', value: 'Barge RP' },
  { colId: 'INFO', value: 'Coral RP' },
  { colId: 'COMMENT', value: 'Star Rating' },
  { colId: 'DEFENCE', value: 'Defence Started' },
  { colId: 'DEFENCE', value: 'Defence Time' },
  { colId: 'DEFENCE', value: 'Played Defence' },
  { colId: 'DEFENCE', value: 'Effective Defence' },
  { colId: 'INFO', value: 'Drove Fast' },
  { colId: 'INFO', value: 'Beached' },
  { colId: 'INFO', value: 'Consistent Scoring' },
  { colId: 'INFO', value: 'Shut Down' },
  { colId: 'INFO', value: 'Fell Over' },
  { colId: 'INFO', value: 'Recovered' },
  { colId: 'INFO', value: 'Foul Often' },
];

const exampleRow0: Row = {
  values: exampleHeaderRow,
};

const exampleDataRow: Cell[] = [
  { colId: 'INFO', value: 4 },
  { colId: 'COMMENT', value: '1310 is great! blah blah blah' },
  { colId: 'INFO', value: 1 },
  { colId: 'INFO', value: 'Left' },
  { colId: 'INFO', value: 'Y' },
  { colId: 'INFO', value: 'Y' },
  { colId: 'AUTO-algae', value: 0 },
  { colId: 'AUTO-algae', value: 0 },
  { colId: 'AUTO-algae', value: 0 },
  { colId: 'AUTO-algae', value: 1 },
  { colId: 'AUTO-algae', value: 0 },
  { colId: 'AUTO-algae', value: 0 },
  { colId: 'AUTO-coral-pickup', value: 0 },
  { colId: 'AUTO-coral-pickup', value: 8 },
  { colId: 'AUTO-coral-pickup', value: 0 },
  { colId: 'AUTO-coral-pickup', value: 3 },
  { colId: 'AUTO-coral-score', value: 0 },
  { colId: 'AUTO-coral-score', value: 0 },
  { colId: 'AUTO-coral-score', value: 1 },
  { colId: 'AUTO-coral-score', value: 5 },
  { colId: 'AUTO-coral-score', value: 0 },
  { colId: 'TELEOP-algae', value: 0 },
  { colId: 'TELEOP-algae', value: 0 },
  { colId: 'TELEOP-algae', value: 0 },
  { colId: 'TELEOP-algae', value: 0 },
  { colId: 'TELEOP-algae', value: 0 },
  { colId: 'TELEOP-algae', value: 0 },
  { colId: 'TELEOP-coral-pickup', value: 0 },
  { colId: 'TELEOP-coral-pickup', value: 0 },
  { colId: 'TELEOP-coral-pickup', value: 0 },
  { colId: 'TELEOP-coral-pickup', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'TELEOP-coral-score', value: 0 },
  { colId: 'ENDGAME', value: 'Deep' },
  { colId: 'PENALTY', value: 0 },
  { colId: 'PENALTY', value: 0 },
  { colId: 'PENALTY', value: 0 },
  { colId: 'PENALTY', value: 0 },
  { colId: 'PENALTY', value: 0 },
  { colId: 'PENALTY', value: 0 },
  { colId: 'INFO', value: 0 },
  { colId: 'INFO', value: 1 },
  { colId: 'INFO', value: 0 },
  { colId: 'COMMENT', value: 5 },
  { colId: 'DEFENCE', value: 0 },
  { colId: 'DEFENCE', value: 0.0 },
  { colId: 'DEFENCE', value: 0 },
  { colId: 'DEFENCE', value: 0 },
  { colId: 'INFO', value: 0 },
  { colId: 'INFO', value: 0 },
  { colId: 'INFO', value: 1 },
  { colId: 'INFO', value: 0 },
  { colId: 'INFO', value: 0 },
  { colId: 'INFO', value: 0 },
  { colId: 'INFO', value: 0 },
];

const exampleRow1 = {
  values: exampleDataRow,
};

const exampleFooterRow: Cell[] = [
  { colId: 'INFO', value: 'Success Rate' },
  { colId: 'COMMENT', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'AUTO-algae', value: undefined },
  { colId: 'AUTO-algae', value: undefined },
  { colId: 'AUTO-algae', value: undefined },
  { colId: 'AUTO-algae', value: undefined },
  { colId: 'AUTO-algae', value: undefined },
  { colId: 'AUTO-algae', value: undefined },
  { colId: 'AUTO-coral-pickup', value: undefined },
  { colId: 'AUTO-coral-pickup', value: undefined },
  { colId: 'AUTO-coral-pickup', value: undefined },
  { colId: 'AUTO-coral-pickup', value: undefined },
  { colId: 'AUTO-coral-score', value: undefined },
  { colId: 'AUTO-coral-score', value: undefined },
  { colId: 'AUTO-coral-score', value: undefined },
  { colId: 'AUTO-coral-score', value: undefined },
  { colId: 'AUTO-coral-score', value: '100%' },
  { colId: 'TELEOP-algae', value: undefined },
  { colId: 'TELEOP-algae', value: undefined },
  { colId: 'TELEOP-algae', value: undefined },
  { colId: 'TELEOP-algae', value: undefined },
  { colId: 'TELEOP-algae', value: undefined },
  { colId: 'TELEOP-algae', value: '50%' },
  { colId: 'TELEOP-coral-pickup', value: undefined },
  { colId: 'TELEOP-coral-pickup', value: undefined },
  { colId: 'TELEOP-coral-pickup', value: undefined },
  { colId: 'TELEOP-coral-pickup', value: undefined },
  { colId: 'TELEOP-coral-score', value: undefined },
  { colId: 'TELEOP-coral-score', value: undefined },
  { colId: 'TELEOP-coral-score', value: undefined },
  { colId: 'TELEOP-coral-score', value: undefined },
  { colId: 'TELEOP-coral-score', value: undefined },
  { colId: 'TELEOP-coral-score', value: undefined },
  { colId: 'TELEOP-coral-score', value: '97%' },
  { colId: 'ENDGAME', value: '75%' },
  { colId: 'PENALTY', value: undefined },
  { colId: 'PENALTY', value: undefined },
  { colId: 'PENALTY', value: undefined },
  { colId: 'PENALTY', value: undefined },
  { colId: 'PENALTY', value: undefined },
  { colId: 'PENALTY', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'COMMENT', value: undefined },
  { colId: 'DEFENCE', value: undefined },
  { colId: 'DEFENCE', value: undefined },
  { colId: 'DEFENCE', value: '100%' },
  { colId: 'DEFENCE', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
  { colId: 'INFO', value: undefined },
];

const exampleRow2: Row = {
  values: exampleFooterRow,
};

const exampleTable: Table = {
  headerRows: [exampleRow0],
  dataRows: [
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
    exampleRow1,
  ],
  footerRows: [exampleRow2],
};

function renderCell(cell: Cell) {
  return <th>{cell.value}</th>;
}

function TournamentReports() {
  const [selectedTournament, setSelectedTournament] = useState('');
  const [teamNumber, setTeamNumber] = useState(-1310);
  const tournaments = getAllTournaments();
  if (tournaments.length === 0) return <Loading />;
  const fullDataTable = exampleTable;

  return (
    <>
      <h2>Tournament Reports</h2>
      <div className={'tournament-select'}>
        <p>Show data for tournament:</p>
        <label>
          <select
            value={selectedTournament}
            onChange={e => setSelectedTournament(e.target.value)}
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
        <input
          className={'center'}
          type={'number'}
          id={'quick-comment-team-number'}
          placeholder={'team #'}
          onChange={e => {
            if (e.target.valueAsNumber > 0) {
              setTeamNumber(e.target.valueAsNumber);
            } else {
              setTeamNumber(-1310);
            }
          }}
        />
      </div>
      <p>
        showing data for {teamNumber} at {selectedTournament}
      </p>

      <section className={'report'}>
        <table>
          <thead>
            {fullDataTable.headerRows.map(r => {
              return (
                <tr>
                  {r.values.map(cell => {
                    return renderCell(cell);
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {fullDataTable.dataRows.map(r => {
              return (
                <tr>
                  {r.values.map(cell => {
                    return renderCell(cell);
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            {fullDataTable.footerRows.map(r => {
              return (
                <tr>
                  {r.values.map(cell => {
                    return renderCell(cell);
                  })}
                </tr>
              );
            })}
          </tfoot>
        </table>
      </section>
    </>
  );
}

export default TournamentReports;
