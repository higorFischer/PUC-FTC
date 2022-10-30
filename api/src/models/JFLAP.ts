export interface JFLAP {
    structure: Structure;
}

export interface Structure {
    type:      string;
    automaton: Automaton;
}

export interface Automaton {
    state:      State[];
    transition: Transition[];
}

export interface State {
	_attributes: {
		id:      string;
		name:    string;
	};
    x:        string;
    y:        string;
    initial?: {};
    final?:   {};
}

export interface Transition {
    from: { _text: string }
    to:   { _text: string }
    read: { _text: string }
}