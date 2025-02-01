import { match_select } from '../modes/match_select.ts';
import { match_config } from '../modes/match_config.ts';
import { start_line } from '../modes/start_line.ts';
import { holding_nothing } from '../modes/holding_nothing.ts';
import { holding_coral } from '../modes/holding_coral.ts';
import { holding_algae } from '../modes/holding_algae.ts';
import { holding_both } from '../modes/holding_both.ts';
import { human_feedback } from '../modes/human_feedback.ts';
import { park } from '../modes/park.ts';
import { start_climb } from '../modes/start_climb.ts';
import { finish_climb } from '../modes/finish_climb.ts';
import { checklist } from '../modes/checklist.ts';
import { Phase } from '../functions/setPhase.ts';

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
            <td>all</td>
            <td>setPhase</td>
            <td>desiredPhase</td>
            <td>change phase</td>
            <td>all</td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.pre_match}</td>
          </tr>
          <tr>
            <td>{match_select.label}</td>
            <td>selectMatch</td>
            <td>scoutName, match #, team #, rematch?</td>
            <td>save data</td>
            <td>{match_config.label}</td>
          </tr>
          <tr>
            <td>{match_config.label}</td>
            <td>autoConfig</td>
            <td>preloaded?, position</td>
            <td>save data, setPhase({Phase.auto})</td>
            <td>{start_line.label}</td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.auto}</td>
          </tr>
          <tr>
            <td>{start_line.label}</td>
            <td>leaveStartingLine</td>
            <td>preloaded?</td>
            <td>save data</td>
            <td>
              {holding_nothing.label}, {holding_coral.label}
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
            <td>{holding_algae.label} (if pluck)</td>
          </tr>
          <tr>
            <td>
              {holding_nothing.label}, {holding_algae.label}
            </td>
            <td>pickupCoral</td>
            <td>pickup location, preset?</td>
            <td>save if ground</td>
            <td>
              {holding_coral.label}, {holding_both.label}
            </td>
          </tr>
          <tr>
            <td>
              {holding_nothing.label}, {holding_coral.label}
            </td>
            <td>pickupAlgae</td>
            <td>preset?</td>
            <td>save if preset</td>
            <td>
              {holding_algae.label}, {holding_both.label}
            </td>
          </tr>
          <tr>
            <td>
              {holding_coral.label}, {holding_both.label}
            </td>
            <td>scoreCoral</td>
            <td>L1,2,3,4, drop, miss</td>
            <td>Save location</td>
            <td>
              {holding_nothing.label}, {holding_algae.label}
            </td>
          </tr>
          <tr>
            <td>
              {holding_algae.label}, {holding_both.label}
            </td>
            <td>scoreAlgae</td>
            <td>processor/net/drop</td>
            <td>save location</td>
            <td>
              {holding_nothing.label}, {holding_coral.label}
            </td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.endgame}</td>
          </tr>
          <tr>
            <td>{park.label}</td>
            <td>isPark</td>
            <td>parked?</td>
            <td>save data</td>
            <td>{start_climb.label}</td>
          </tr>
          <tr>
            <td>{start_climb.label}</td>
            <td>isClimbing</td>
            <td>shallow/deep</td>
            <td>save data</td>
            <td>{finish_climb.label}</td>
          </tr>
          <tr>
            <td>{start_climb.label}</td>
            <td>isClimbed</td>
            <td>isClimbed?</td>
            <td>save data</td>
            <td>{checklist.label}</td>
          </tr>
          <tr>
            <td colSpan={5}>{Phase.comments}</td>
          </tr>
          <tr>
            <td>{checklist.label}</td>
            <td>saveChecklist</td>
            <td>checklistItems[]</td>
            <td>save data</td>
            <td>{human_feedback.label}</td>
          </tr>
          <tr>
            <td>{human_feedback.label}</td>
            <td>saveFeedback</td>
            <td>writtenComment, RPs, *stars*</td>
            <td>save data</td>
            <td>{match_select.label}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
export default Functions;

// Initial Modes, Function, Input, Action, Next Modes
// Saves data, changes modes
