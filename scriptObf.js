function dijkstra(graph, startNode) {
    const distances = {};
    const visited = {};
    const previous = {};
    const queue = new PriorityQueue();

    // Инициализация начальных значений
    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[startNode] = 0;
/* /** */
    // Добавляем стартовую вершину в очередь
    queue.enqueue(startNode, 0);

    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue().data;
        visited[currentNode] = true;

        for (let neighborNode in graph[currentNode]) {
            const cost = graph[currentNode][neighborNode];
            const totalCost = distances[currentNode] + cost;

            if (totalCost < distances[neighborNode]) {
                distances[neighborNode] = totalCost;
                previous[neighborNode] = currentNode;
            }

            if (!visited[neighborNode]) {
                queue.enqueue(neighborNode, distances[neighborNode]);
            }
        }
    }

    return { distances, previous };
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(data, priority) {
        this.queue.push({ data, priority });
        this.sort();
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }
}

/* Пример использования */
const graph = {
    A: { B: 5, C: 2 },
    B: { A: 5, C: 1, D: 3 },
    C: { A: 2, B: 1, D: 2 },
    D: { B: 3, C: 2 },
};

const startNode = "A";

const { distances, previous } = dijkstra(graph, startNode);

console.log(distances);  // Выводит { A: 0, B: 3, C: 2, D: 4 }
console.log(previous);  // Выводит { A: null, B: "C", C: "A", D: "C" }