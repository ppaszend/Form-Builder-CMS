import styles from './Switcher.module.scss';
import {useEffect, useState} from "react";

interface SwitcherProps {
    initialState: boolean;
    stateChange: (state: boolean) => void
}

export default function Switcher(props: SwitcherProps) {
    const [state, setState] = useState(props.initialState);

    useEffect(() => {
        props.stateChange(state)
    }, [state]);

    return (
        <div className={styles.switcher}
             onClick={() => setState(!state)}
             style={{background: state ? '#1976d2' : '#b0bec5'}}
        >
            <div className={styles.indicator}
                 style={{left: state ? '30px' : '4px'}}
            />
        </div>
    )
}