export function getFuelMixComposition(type: string, content: string): any {

  //invoke axios function for backend endpoint to retrieve fuelmix for the associated region/datacenter
	return {
		user: type,
		timestamp: new Date().toISOString(),
		content: content
	} as any;
}