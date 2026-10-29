
const debugChallenges = [
  {
    id: 1,
    title: "The Missing Number",
    difficulty: "Easy",
    language: "C++",
    xp: 100,
    description:
      "Calculate the sum of numbers from 1 to 5. Fix the loop so that 5 is included.",
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
    hint: "The loop stops before reaching 5. Check the < operator.",
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
    checkPattern: /for\s*\(\s*int\s+i\s*=\s*1\s*;\s*i\s*<=\s*5\s*;\s*i\+\+\s*\)/,
  },
  {
    id: 2,
    title: "The Off-by-One Bug",
    difficulty: "Easy",
    language: "C++",
    xp: 100,
    description:
      "Print the numbers from 1 to 10. The output must include 10.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i < 10; i++) {
        cout << i << " ";
    }

    return 0;
}`,
    expectedOutput: "1 2 3 4 5 6 7 8 9 10",
    hint: "The loop currently stops before printing 10.",
    solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }

    return 0;
}`,
    checkPattern: /for\s*\(\s*int\s+i\s*=\s*1\s*;\s*i\s*<=\s*10\s*;\s*i\+\+\s*\)/,
  },
  {
    id: 3,
    title: "The Wrong Operator",
    difficulty: "Medium",
    language: "C++",
    xp: 150,
    description:
      "Multiply 4 by 3 and print the result. Find and fix the incorrect operator.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int result = 4 + 3;

    cout << result;
    return 0;
}`,
    expectedOutput: "12",
    hint: "The + operator adds numbers. Which operator multiplies them?",
    solution: `#include <iostream>
using namespace std;

int main() {
    int result = 4 * 3;

    cout << result;
    return 0;
}`,
    checkPattern: /int\s+result\s*=\s*4\s*\*\s*3\s*;/,
  },
];

export default debugChallenges;
