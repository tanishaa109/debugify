
const debugChallenges = [
  {
    id: 1,
    title: "The Missing Number",
    difficulty: "Easy",
    language: "C++",
    description:
      "Find the sum of numbers from 1 to 5. Fix the loop so that 5 is included.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i < 5; i++) {
        sum += i;
    }

    cout << "Sum: " << sum;
    return 0;
}`,
    expectedOutput: "Sum: 15",
    hint: "Check the loop condition. Should it stop before 5?",
    solution: `#include <iostream>
using namespace std;

int main() {
    int sum = 0;

    for (int i = 1; i <= 5; i++) {
        sum += i;
    }

    cout << "Sum: " << sum;
    return 0;
}`,
    checkPattern: /i\s*<=\s*5/,
  },
  {
    id: 2,
    title: "The Off-by-One Bug",
    difficulty: "Easy",
    language: "C++",
    description:
      "Print the numbers from 1 to 10, including 10.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i < 10; i++) {
        cout << i << " ";
    }

    return 0;
}`,
    expectedOutput: "1 2 3 4 5 6 7 8 9 10",
    hint: "The loop currently stops before reaching 10.",
    solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }

    return 0;
}`,
    checkPattern: /i\s*<=\s*10/,
  },
  {
    id: 3,
    title: "The Wrong Operator",
    difficulty: "Medium",
    language: "C++",
    description:
      "Multiply 4 by 3 and print the result. Find the incorrect operator.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int result = 4 + 3;
    cout << result;
    return 0;
}`,
    expectedOutput: "12",
    hint: "Addition and multiplication use different operators.",
    solution: `#include <iostream>
using namespace std;

int main() {
    int result = 4 * 3;
    cout << result;
    return 0;
}`,
    checkPattern: /4\s*\*\s*3/,
  },
];

export default debugChallenges;
