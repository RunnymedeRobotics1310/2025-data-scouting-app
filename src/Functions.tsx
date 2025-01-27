import { Phase } from './Modes.tsx';
import { Modes } from './Modes.tsx';

function Functions() {
  return (
    <>
      <table className={'functions'}>
        <thead>
          <tr>
            <th>Initial Modes</th>
            <th>Function</th>
            <th>Input</th>
            <th>Action</th>
            <th>Next Modes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>n/a</td>
            <td>setPhase</td>
            <td>desiredPhase</td>
            <td>change phase</td>
            <td>n/a</td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.pre_match}</td>
          </tr>
          <tr>
            <td>{Modes.match_select}</td>
            <td>selectMatch</td>
            <td>scoutName, match #, team #, rematch?</td>
            <td>save data</td>
            <td>{Modes.config}</td>
          </tr>
          <tr>
            <td>{Modes.config}</td>
            <td>autoConfig</td>
            <td>preloaded?, position</td>
            <td>save data, setPhase({Phase.auto})</td>
            <td>{Modes.start_line}</td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.auto}</td>
          </tr>
          <tr>
            <td>{Modes.start_line}</td>
            <td>leaveStartingLine</td>
            <td>preloaded?</td>
            <td>save data</td>
            <td>
              {Modes.holding_nothing}, {Modes.holding_coral}
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              {Phase.auto}, {Phase.teleop}
            </td>
          </tr>
          <tr>
            <td>holding any</td>
            <td>removeAlgae</td>
            <td>remove/pluck</td>
            <td>save data</td>
            <td>{Modes.holding_algae} (if pluck)</td>
          </tr>
          <tr>
            <td>
              {Modes.holding_nothing}, {Modes.holding_algae}
            </td>
            <td>pickupCoral</td>
            <td>pickup location, preset?</td>
            <td>save if ground</td>
            <td>
              {Modes.holding_coral}, {Modes.holding_both}
            </td>
          </tr>
          <tr>
            <td>
              {Modes.holding_nothing}, {Modes.holding_coral}
            </td>
            <td>pickupAlgae</td>
            <td>preset?</td>
            <td>save if preset</td>
            <td>
              {Modes.holding_algae}, {Modes.holding_both}
            </td>
          </tr>
          <tr>
            <td>
              {Modes.holding_coral}, {Modes.holding_both}
            </td>
            <td>scoreCoral</td>
            <td>L1,2,3,4, drop, miss</td>
            <td>Save location</td>
            <td>
              {Modes.holding_nothing}, {Modes.holding_algae}
            </td>
          </tr>
          <tr>
            <td>
              {Modes.holding_algae}, {Modes.holding_both}
            </td>
            <td>scoreAlgae</td>
            <td>processor/net/drop</td>
            <td>save location</td>
            <td>
              {Modes.holding_nothing}, {Modes.holding_coral}
            </td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.endgame}</td>
          </tr>
          <tr>
            <td>{Modes.park}</td>
            <td>isPark</td>
            <td>parked?</td>
            <td>save data</td>
            <td>{Modes.start_climb}</td>
          </tr>
          <tr>
            <td>{Modes.start_climb}</td>
            <td>isClimbing</td>
            <td>shallow/deep</td>
            <td>save data</td>
            <td>{Modes.finish_climb}</td>
          </tr>
          <tr>
            <td>{Modes.start_climb}</td>
            <td>isClimbed</td>
            <td>isClimbed?</td>
            <td>save data</td>
            <td>{Modes.checklist}</td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.comments}</td>
          </tr>
          <tr>
            <td>{Modes.checklist}</td>
            <td>saveChecklist</td>
            <td>checklistItems[]</td>
            <td>save data</td>
            <td>{Modes.human_feedback}</td>
          </tr>
          <tr>
            <td>{Modes.human_feedback}</td>
            <td>saveFeedback</td>
            <td>writtenComment, RPs, *stars*</td>
            <td>save data</td>
            <td>{Modes.match_select}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default Functions;

// Initial Modes, Function, Input, Action, Next Modes
// Saves data, changes modes
