function ModeComponent() {
  return (
    <>
      <p>Hello from Modes!</p>
      <ul>
        <li>
          PRE-MATCH
          <ul>
            <li>Match select</li>
            <ul>
              <li>Match Schedule Button</li>
              <li>Name</li>
              <li>Match #</li>
              <li>Red alliance #1, #2, #3</li>
              <li>Blue alliance #1, #2, #3</li>
              <li>Rematch?</li>
              <li>next ---&gt; Auto Config</li>
            </ul>
            <li>Config</li>
            <ul>
              <li>Team #</li>
              <li>Preloaded?</li>
              <li>Human at Processor?</li>
              <li>Position</li>
              <ul>
                <li>Left</li>
                <li>Center</li>
                <li>Right</li>
              </ul>
              <li>Map of auto start area</li>
              <li>Start ---&gt; AUTO</li>
            </ul>
          </ul>
        </li>

        <li>
          AUTO
          <ul>
            <li>Leave Starting Line ---&gt; Holding Nothing/Coral</li>
            <li>
              Holding Nothing
              <ul>
                <li>Remove/Pluck Algae</li>
                <li>Pickup Coral</li>
                <ul>
                  <li>Ground</li>
                  <li>Left Station</li>
                  <li>Right Station</li>
                </ul>
                <li>Pickup Algae</li>
                <li>Pickup preset Coral</li>
                <li>Pickup preset algae</li>
              </ul>
            </li>
            <li>
              Holding Coral
              <ul>
                <li>Remove/Pluck Algae</li>
                <li>Score Reef</li>
                <ol>
                  <li />
                  <li />
                  <li />
                  <li />
                </ol>
                <ul>
                  <li>Miss</li>
                  <li>Back</li>
                </ul>
                <li>Dropped coral</li>
                <li>Pickup preset algae</li>
              </ul>
            </li>
            <li>
              Holding Algae
              <ul>
                <li>Remove/Pluck Algae</li>
                <li>Score Algae</li>
                <ul>
                  <li>Processor</li>
                  <li>Net</li>
                  <li>Back</li>
                </ul>
                <li>Dropped Algae</li>
                <li>
                  Pickup Coral
                  <ul>
                    <li>Ground</li>
                    <li>Left Station</li>
                    <li>Right Station</li>
                  </ul>
                </li>
                <li>Pickup preset coral</li>
              </ul>
            </li>
            <li>Holding Both</li>
            <ul>
              <li>Remove/Pluck Algae</li>
              <li>Score Reef</li>

              <ol>
                <li />
                <li />
                <li />
                <li />
              </ol>
              <ul>
                <li>Miss</li>
                <li>Back</li>
              </ul>
              <li>Score Algae</li>
              <ul>
                <li>Processor</li>
                <li>Net</li>
                <li>Back</li>
              </ul>
              <li>Dropped Coral</li>
              <li>Dropped Algae</li>
            </ul>
            <li>Toggle mode ---&gt; TELEOP</li>
          </ul>
        </li>
        <li>
          TELEOP
          <ul>
            <li>
              Holding Nothing
              <ul>
                <li>
                  Defence
                  <ul>
                    <li>Timer</li>
                  </ul>
                </li>
                <li>Remove/Pluck Algae</li>
                <li>
                  Pickup Coral
                  <ul>
                    <li>Ground</li>
                    <li>Left Station</li>
                    <li>Right Station</li>
                  </ul>
                </li>
                <li>Pickup Algae</li>
              </ul>
            </li>
            <li>
              Holding Coral
              <ul>
                <li>
                  Defence
                  <ul>
                    <li>Timer</li>
                  </ul>
                </li>
                <li>Remove/Pluck Algae</li>
                <li>
                  Score Reef
                  <ul>
                    <li>
                      <ol>
                        <li />
                        <li />
                        <li />
                        <li />
                      </ol>
                    </li>
                    <li>Miss</li>
                    <li>Back</li>
                  </ul>
                </li>
                <li>Dropped Coral</li>
                <li>Pickup Algae</li>
              </ul>
            </li>
            <li>
              Holding Algae
              <ul>
                <li>
                  Defence
                  <ul>
                    <li>Timer</li>
                  </ul>
                </li>
                <li>Remove/Pluck algae</li>
                <li>
                  Score Algae
                  <ul>
                    <li>Processor</li>
                    <li>Net</li>
                    <li>Back</li>
                  </ul>
                </li>
                <li>Dropped algae</li>
                <li>
                  Pickup coral
                  <ul>
                    <li>Ground</li>
                    <li>Left Station</li>
                    <li>Right Station</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Holding Both
              <ul>
                <li>
                  Defence
                  <ul>
                    <li>Timer</li>
                  </ul>
                </li>
                <li>Remove/Pluck Algae</li>
                <li>
                  Score Reef
                  <ul>
                    <li>
                      <ol>
                        <li />
                        <li />
                        <li />
                        <li />
                      </ol>
                    </li>
                    <li>Miss</li>
                    <li>Back</li>
                  </ul>
                </li>
                <li>
                  Score Algae
                  <ol>
                    <li>Processor</li>
                    <li>Net</li>
                    <li>Back</li>
                  </ol>
                </li>
                <li>Dropped Coral</li>
                <li>Dropped Algae</li>
              </ul>
            </li>
            <li>Endgame ---&gt; ENDGAME</li>
          </ul>
        </li>
        <li>
          ENDGAME
          <ul>
            <li>
              Park ---&gt; Confirm
              <ul>
                <li>Shallow</li>
                <li>Deep</li>
                <li>Left Barge Zone</li>
              </ul>
            </li>
            <li>
              Confirm
              <ul>
                <li>Climbed ---&gt; COMMENTS</li>
                <li>Stopped Climbing ---&gt; COMMENTS</li>
              </ul>
            </li>
            <li>Next ---&gt; COMMENTS</li>
          </ul>
        </li>
        <li>
          COMMENTS
          <ul>
            <li>
              Did the robot...
              <ul>
                <li>
                  Fall over?
                  <ul>
                    <li>Recover?</li>
                  </ul>
                </li>
                <li>Shut down?</li>
                <li>
                  Play defence?
                  <ul>
                    <li>Effectively?</li>
                  </ul>
                </li>
                <li>Play collector?</li>
                <li>Foul often?</li>
                <li>Score consistently?</li>
                <li>Drive Fast?</li>
                <li>Next ---&gt; Human Feedback</li>
              </ul>
            </li>
            <li>
              Human Feedback
              <ul>
                <li>type here...</li>
                <li>
                  Ranking Points
                  <ul>
                    <li>Auto?</li>
                    <li>Coral?</li>
                    <li>Barge?</li>
                  </ul>
                </li>
                <li>Star rating</li>
                <li>Done ---&gt; PRE-MATCH</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}
export default ModeComponent;
