import {
  saveMatch,
  useScheduleDetail,
  useTournamentList,
} from '../../storage/ravenbrain.ts';
import Loading from '../../common/Loading.tsx';
import { useState } from 'react';

function RBScheduleAdmin() {
  function List() {
    const { list, error, loading } = useTournamentList();
    const [tournamentDetail, setTournamentDetail] = useState<any>(null);
    const [showForm, setShowForm] = useState(false);
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div>Error loading schedule: {error}</div>;
    }
    return (
      <>
        <div>
          <h3>Schedule</h3>
          <ul>
            {list.map((t: any) => (
              <li key={t.id}>
                {t.name}
                <button
                  onClick={() => setTournamentDetail(t)}
                  disabled={tournamentDetail && tournamentDetail.id === t.id}
                >
                  View Schedule
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowForm(true)}>Add Schedule</button>
        </div>
        {showForm && <ShowForm closeFormCallback={() => setShowForm(false)} />}
        {tournamentDetail && (
          <ShowSchedule
            tournamentDetail={tournamentDetail}
            setTournamentDetail={() => setTournamentDetail(null)}
          />
        )}
      </>
    );
  }
  return (
    <div>
      <h3>Schedule Admin</h3>
      <List />
    </div>
  );
  type DetailType = {
    tournamentDetail: any;
    setTournamentDetail: any;
  };

  function ShowSchedule(props: DetailType) {
    const { tournamentDetail, setTournamentDetail } = props;
    const { schedule, error, loading } = useScheduleDetail(tournamentDetail.id);
    console.log(schedule);

    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div>Error loading schedule: {error}</div>;
    }

    return (
      <section>
        <h4>Schedule Details:</h4>
        <table>
          <tbody>
            <tr>
              <th>Match #</th>
              <th>red 1</th>
              <th>Red 2</th>
              <th>redh 3</th>
              <th>Blue 1</th>
              <th>Blue 2</th>
              <th>blUe 3</th>
              <th>Blue score</th>
              <th>Red score</th>
            </tr>
            {schedule.map(row => {
              return (
                <tr>
                  <td>{row.match}</td>
                  <td>{row.red1}</td>
                  <td>{row.red2}</td>
                  <td>{row.red3}</td>
                  <td>{row.blue1}</td>
                  <td>{row.blue2}</td>
                  <td>{row.blue3}</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>{tournamentDetail.description}</p>
        <button onClick={() => setTournamentDetail()}>Close</button>
      </section>
    );
  }
  type FormType = {
    closeFormCallback: () => void;
  };
  function ShowForm(props: FormType) {
    const [match, setMatch] = useState<any>({});
    function handleSave() {
      console.log('Save', match);
      saveMatch(match)
        .then(success => {
          if (success) {
            console.log('Saved');
            props.closeFormCallback();
          } else {
            console.error('Failed to save match');
          }
        })
        .catch(e => {
          console.error('Failed to save match', e);
        });
    }
    return (
      <section>
        <h4>Add Match</h4>
        <table>
          <tbody>
            <tr>
              <th>Match #</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      match: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Red 1</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      red1: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Red 2</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      red2: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Red 3</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      red3: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Blue 1</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      blue1: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Blue 2</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      blue2: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Blue 3</th>
              <td>
                <input
                  type="number"
                  onChange={e =>
                    setMatch({
                      ...match,
                      blue3: e.target.valueAsNumber,
                    })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={() => handleSave()}
          disabled={
            match.match == null ||
            match.red1 == null ||
            match.red2 == null ||
            match.red3 == null ||
            match.blue1 == null ||
            match.blue2 == null ||
            match.blue3 == null
          }
        >
          Save
        </button>
      </section>
    );
  }
}

export default RBScheduleAdmin;
