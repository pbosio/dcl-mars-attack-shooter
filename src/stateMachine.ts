export class StateMachine implements ISystem {
    private states: WrappedState[] = [];

    public enqueueState(state: StateMachine.IState) {
        this.states.push({ state: state, started: false });
    }

    public setState(state: StateMachine.IState) {
        this.states = [{ state: state, started: false }];
    }

    public update(dt: number) {
        if (this.states.length > 0) {
            const currentState = this.states[0];
            if (!currentState.started) {
                currentState.state.start()
                currentState.started = true;
            }
            if (currentState.state.update) currentState.state.update(dt);
            if (currentState.state.hasFinish()) {
                if (currentState.state.finish) currentState.state.finish();
                this.states.splice(0, 1);
            }
        }
    }
}

export namespace StateMachine {
    export interface IState {
        start(): void
        update?(dt: number): void
        finish?(): void
        hasFinish(): boolean
    }
}

class WrappedState {
    state: StateMachine.IState
    started: boolean = false;
}