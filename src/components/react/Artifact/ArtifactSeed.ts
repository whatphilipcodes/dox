import * as THREE from 'three';
import seedrandom from 'seedrandom';

export class ArtifactSeed {
	private svg: string | null = null;
	private random: seedrandom.PRNG;
	private colors: THREE.Color[] = [];

	constructor() {
		// Initialize with a default seed
		this.random = seedrandom('default');
	}

	public async loadSVG(path: URL): Promise<void> {
		try {
			const response = await fetch(path);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			this.svg = await response.text();
			this.random = seedrandom(this.svg);
			this.extractColors();
		} catch (error: unknown) {
			console.error('Failed to load SVG:', error);
			this.setDefaultColors();
		}
	}

	public getColors(): THREE.Color[] {
		return this.colors;
	}

	public getRandom(): number {
		return this.random();
	}

	private extractColors(): void {
		if (!this.svg) {
			this.setDefaultColors();
			return;
		}

		const colorRegex = /#[0-9A-Fa-f]{6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\\s*\)/g;
		const foundColors = this.svg.match(colorRegex) || [];
		const parsedColors = foundColors.map((color) => new THREE.Color(color));

		if (parsedColors.length >= 3) {
			this.colors = this.selectRandomColors(parsedColors, 3);
		} else {
			this.setDefaultColors();
		}
	}

	private getColorSaturation(color: THREE.Color): number {
		const hsl = { h: 0, s: 0, l: 0 };
		color.getHSL(hsl);
		return hsl.s;
	}

	private getColorLuminance(color: THREE.Color): number {
		const hsl = { h: 0, s: 0, l: 0 };
		color.getHSL(hsl);
		return hsl.l;
	}

	private selectRandomColors(
		colors: THREE.Color[],
		count: number,
	): THREE.Color[] {
		if (colors.length === 0) {
			this.setDefaultColors();
			return this.colors;
		}

		// First sort by saturation to prefer colorful colors
		const saturatedColors = [...colors].sort(
			(a, b) => this.getColorSaturation(b) - this.getColorSaturation(a),
		);

		// Take the top half of saturated colors and sort them by luminance (dark to light)
		const numPreferred = Math.max(Math.ceil(saturatedColors.length / 2), count);
		const preferredColors = saturatedColors
			.slice(0, numPreferred)
			.sort((a, b) => this.getColorLuminance(a) - this.getColorLuminance(b)); // Reversed comparison

		// Select the specified number of colors
		return preferredColors.slice(0, count);
	}

	private setDefaultColors(): void {
		this.colors = [
			new THREE.Color('#1a1a1a'), // Dark
			new THREE.Color('#2f74c0'), // Medium
			new THREE.Color('#ffffff'), // Light
		];
	}
}
