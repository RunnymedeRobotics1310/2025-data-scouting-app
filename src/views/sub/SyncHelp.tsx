export function SyncHelp() {
  return (
    <section>
      <h3>Sync Help</h3>
      <p>
        If you are having trouble with sync, some of the following may be of
        assistance.
      </p>
      <h4>Check Internet Connectivity</h4>
      <p>
        To sync, you need to be connected to the Internet. The app will
        authenticate you with Google, and save data to google sheets. You will
        need Internet connectivity to do this.
      </p>
      <h4>Authenticate Button Does Nothing</h4>
      <p>
        If the authenticate button seems to do nothing, and you are actually
        connected to the Internet at the time, sometimes the authenticate button
        will appear to have no effect. This can occur if you have certain types
        of ad blockers or privacy extensions installed in your browser. Try
        disabling these extensions, or using a different browser.
      </p>
      <p>
        On an iOS device, you can do this by opening Settings &gt; Apps &gt;
        Safari. There are two settings that can affect this. The first one is
        "Hide IP Address". You MAY need to set this to "off" to allow the app to
        authenticate you with Google. This is not always necessary - it depends
        on whether or not your device thinks it's protecting you by doing this.
        You can change it back to your regular setting at the end of your
        scouting session.
      </p>
      <p>
        The second setting you can try is "Block Popups". Authentication opens
        in a popup. If your device decides that the authentication window is not
        the "right kind" of popup, it may block it, so you may need to disable
        this as well.
      </p>
      <p>
        If you are on Android or another operating system, you may need to do
        the equivalent of the above to get this to work.
      </p>
      <h4>Sync Count is High</h4>
      <p>
        The count of unsynchronized items corresponds to the number of events
        that have been recorded by your device that have not been confirmed as
        uploaded to Google Sheets. Upload confirmation was not active until
        version 1.5.0 of the app. When you sync, the app will attempt to send
        all of your recorded events up to the spreadsheet. However, our app is
        affected by rate limits, and only a fixed number of events can be sent
        to Sheets every minute. Once the maximum number is reached, no syncs
        will be allowed until the limit is lifted, which is somewhere between
        one and five minutes later. During a competition, if all scouts rush out
        and sync at the same time, we'll probably hit the limit.
      </p>
      <p>
        You can sync as many times as you want. The app will only try to talk to
        google if you actually have data that hasn't been synchronized.
      </p>
    </section>
  );
}
