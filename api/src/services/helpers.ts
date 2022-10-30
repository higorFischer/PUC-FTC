export function AddOnMap<T>(map: Map<T, T[]>, key: T, newValue: T[]){
	if(!map?.has(key))
		map?.set(key, [] as T[]);
		
	map?.set(key, Distinct<T>(map?.get(key)!, newValue));
}

export function Distinct<T>(oldArr: T[], newArr: Array<T>){
	return [...new Set([...oldArr!, ...newArr!])]
}

export function getMapKeysByValue(keys: string[], map: Map<string, Map<string, string[]>>){
	var newMap = new Map<string, string[]>();
	for(var key of keys){
		var values = map.get(key);
		var transitions = map.get(key)?.keys();

		if(!transitions) continue;

		for(var transition of transitions){
			if(!newMap.has(transition))
				newMap.set(transition, []);

			var oldArray = newMap.get(transition);
			var newArray = values?.get(transition);
			newMap.set(transition, [...new Set([...oldArray!, ...newArray!])])
		}
	}
	return newMap;
}