const output = document.getElementById('output');

output.innerHTML = `
	<tr id="loading">
		<td colspan="2">Loading...</td>
	</tr>
`;

const start = performance.now();

function createPromise(name) {
	const delay = Math.random() * 2 + 1;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				name,
				time: delay
			});
		}, delay * 1000);
	});
}

const promise1 = createPromise("Promise 1");
const promise2 = createPromise("Promise 2");
const promise3 = createPromise("Promise 3");

Promise.all([promise1, promise2, promise3])
	.then((results) => {

		output.innerHTML = "";

		results.forEach((result) => {

			const row = document.createElement("tr");

			row.innerHTML = `
				<td>${result.name}</td>
				<td>${result.time.toFixed(3)}</td>
			`;

			output.appendChild(row);
		});

		const totalTime =
			(performance.now() - start) / 1000;

		const totalRow = document.createElement("tr");

		totalRow.innerHTML = `
			<td>Total</td>
			<td>${totalTime.toFixed(3)}</td>
		`;

		output.appendChild(totalRow);
	});