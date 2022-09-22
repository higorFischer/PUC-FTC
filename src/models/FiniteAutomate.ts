export class FiniteAutomate<T> {
	constructor(
		public states: Map<string, Map<string, T>>,
		public initial: string,
		public finals: string[]
	) {}

	public isFinal(state: string){
		for(var final of this.finals){
			if(state.includes(final)) 
				return true;
		}
		return false
	}
}