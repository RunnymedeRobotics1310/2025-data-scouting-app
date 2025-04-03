import { saveTournament, useTournamentList } from '../storage/ravenbrain.ts';
import Loading from '../common/Loading.tsx';
import { useState } from 'react';
import ErrorMessage from '../common/ErrorMessage.tsx';

function RBTournamentAdmin() {
  function List() {
    const { list, error, loading, refresh } = useTournamentList();
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
        <p>
          The following tournaments are configured in the system. View details
          or add new ones. Edit is not yet supported. Contact the developer if
          you need to make modifications.
        </p>
        <ul>
          {list.map((t: any) => (
            <li key={t.id}>
              {t.name}{' '}
              <button
                className={'adminListViewDetailsButton'}
                onClick={() => setTournamentDetail(t)}
                disabled={tournamentDetail && tournamentDetail.id === t.id}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setShowForm(true)}>Add Tournament</button>
        {showForm && (
          <ShowForm
            closeFormCallback={() => setShowForm(false)}
            refreshCallback={() => refresh()}
          />
        )}
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
    <section className={'tournamentAdmin'}>
      <h3>Tournament Administration</h3>
      <List />
    </section>
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
              <th>ID</th>
              <td> {tournamentDetail.id}</td>
            </tr>
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
    refreshCallback: () => void;
  };
  function ShowForm(props: FormType) {
    const [tourn, setTourn] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    function handleSave() {
      console.log('Save', tourn);
      saveTournament(tourn)
        .then(success => {
          if (success) {
            console.log('Saved');
            props.closeFormCallback();
            props.refreshCallback();
          } else {
            console.error('Failed to save tournament');
            setError(
              'The tournament was not saved. Is the id duplicated? If not, check with the programming team.',
            );
          }
        })
        .catch(e => {
          console.error('Failed to save tournament', e);
          setError('Failed to save tournament - ' + e);
        });
    }
    return (
      <section>
        <p>Complete the details below and save to add a new tournament.</p>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                <input
                  type="text"
                  onChange={e =>
                    setTourn({
                      ...tourn,
                      id: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
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
