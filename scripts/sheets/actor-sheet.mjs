export function SSActorSheetMixin(Base) {
	return class SSActorSheet extends Base {
		static get defaultOptions() {
			return foundry.utils.mergeObject(super.defaultOptions, {
				width: 1000
			})
		}
	}
}