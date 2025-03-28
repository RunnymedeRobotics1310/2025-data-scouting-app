import { saveTournament, useTournamentList } from '../../storage/ravenbrain.ts';
import Loading from '../../common/Loading.tsx';
import { useState } from 'react';

function RBTournamentAdmin() {
  function List() {
    const { list, error, loading } = useTournamentList();
    const [tournamentDetail, setTournamentDetail] = useState<any>(null);
    const [showForm, setShowForm] = useState(false);
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div>Error loading tournament list: {error}</div>;
    }
    return (
      <div>
        <h3>Tournament List</h3>
        <ul>
          {list.map((t: any) => (
            <li key={t.id}>
              {t.name}{' '}
              <button
                onClick={() => setTournamentDetail(t)}
                disabled={tournamentDetail && tournamentDetail.id === t.id}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowForm(true)}>Add Tournament</button>
        {showForm && <ShowForm closeFormCallback={() => setShowForm(false)} />}
        {tournamentDetail && (
          <ShowDetails
            tournamentDetail={tournamentDetail}
            setTournamentDetail={() => setTournamentDetail(null)}
          />
        )}
      </div>
    );
  }
  return (
    <div>
      <h3>Tournament Admin</h3>
      <List />
    </div>
  );
  type DetailType = {
    tournamentDetail: any;
    setTournamentDetail: any;
  };
  function ShowDetails(props: DetailType) {
    const { tournamentDetail, setTournamentDetail } = props;
    return (
      <section>
        <h4>Tournament Details:</h4>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td> {tournamentDetail.name}</td>
            </tr>
            <tr>
              <th>Start Date</th>
              <td>{tournamentDetail.startTime}</td>
            </tr>
            <tr>
              <th>End Date</th>
              <td>{tournamentDetail.endTime}</td>
            </tr>
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
    const [tourn, setTourn] = useState<any>({});
    function handleSave() {
      console.log('Save', tourn);
      saveTournament(tourn)
        .then(success => {
          if (success) {
            console.log('Saved');
            props.closeFormCallback();
          } else {
            console.error('Failed to save tournament');
          }
        })
        .catch(e => {
          console.error('Failed to save tournament', e);
        });
    }
    return (
      <section>
        <h4>Add Tournament</h4>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                <input
                  type="text"
                  onChange={e =>
                    setTourn({
                      ...tourn,
                      name: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>Start (in UTC)</th>
              <td>
                <input
                  type="datetime-local"
                  onChange={e =>
                    setTourn({
                      ...tourn,
                      startTime: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>End (in UTC)</th>
              <td>
                <input
                  type="datetime-local"
                  onChange={e =>
                    setTourn({
                      ...tourn,
                      endTime: e.target.value,
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
            tourn.name == null ||
            tourn.startTime == null ||
            tourn.endTime == null
          }
        >
          Save
        </button>
      </section>
    );
  }
}

export default RBTournamentAdmin;
