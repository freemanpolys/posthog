import { LemonDivider, Link } from '@posthog/lemon-ui'
import { useActions, useValues } from 'kea'

import { playerSettingsLogic } from '../player/playerSettingsLogic'
import { sessionRecordingsPlaylistLogic } from './sessionRecordingsPlaylistLogic'

export const SessionRecordingsPlaylistTroubleshooting = (): JSX.Element => {
    const { hideViewedRecordings } = useValues(playerSettingsLogic)
    const { setHideViewedRecordings } = useActions(playerSettingsLogic)
    const { otherRecordings } = useValues(sessionRecordingsPlaylistLogic)
    const { setShowSettings } = useActions(sessionRecordingsPlaylistLogic)

    return (
        <>
            <h3 className="title align-center text-secondary mb-0">No matching recordings</h3>
            <div className="flex flex-col deprecated-space-y-2">
                <p className="text-secondary description m-0">
                    Recordings may not be found for a variety of reasons including:
                </p>

                <ul className="deprecated-space-y-1">
                    <h5>All recording sources:</h5>
                    {otherRecordings.length > 0 && hideViewedRecordings && (
                        <li>
                            Viewed recordings hidden.{' '}
                            <Link
                                onClick={() => {
                                    setShowSettings(true)
                                    setHideViewedRecordings(false)
                                }}
                            >
                                Toggle option
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="https://posthog.com/docs/session-replay/data-retention" target="_blank">
                            They are outside the retention period
                        </Link>
                    </li>
                    <LemonDivider dashed={true} />
                    <h5>Web recordings</h5>
                    <li>
                        <Link
                            to="https://posthog.com/docs/session-replay/troubleshooting#4-adtracking-blockers"
                            target="_blank"
                        >
                            An ad blocker prevented recording
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="https://posthog.com/docs/session-replay/troubleshooting#1-authorized-domains-for-recordings"
                            target="_blank"
                        >
                            Your domain is not authorized
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
