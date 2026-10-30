
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

  {
    id: 4,
    title: "The Wrong Condition",
    difficulty: "Medium",
    language: "C++",
    xp: 150,
    description:
      "A person aged 18 or above should be classified as an adult. Fix the condition.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int age = 18;

    if (age > 18) {
        cout << "Adult";
    }

    return 0;
}`,
    expectedOutput: "Adult",
    hint: "An age of exactly 18 should also satisfy the condition.",
    solution: `#include <iostream>
using namespace std;

int main() {
    int age = 18;

    if (age >= 18) {
        cout << "Adult";
    }

    return 0;
}`,
    checkPattern: /if\s*\(\s*age\s*>=\s*18\s*\)/,
  },

  {
    id: 5,
    title: "The Missing Update",
    difficulty: "Medium",
    language: "C++",
    xp: 150,
    description:
      "Print numbers from 1 to 5. Fix the loop so its counter increases.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; ) {
        cout << i << " ";
    }

    return 0;
}`,
    expectedOutput: "1 2 3 4 5",
    hint: "The loop counter needs to increase after every iteration.",
    solution: `#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }

    return 0;
}`,
    checkPattern: /for\s*\(\s*int\s+i\s*=\s*1\s*;\s*i\s*<=\s*5\s*;\s*i\+\+\s*\)/,
  },

  {
    id: 6,
    title: "The Array Mystery",
    difficulty: "Hard",
    language: "C++",
    xp: 200,
    description:
      "Print the fourth element of the array. Find the incorrect index.",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    cout << arr[4];

    return 0;
}`,
    expectedOutput: "40",
    hint: "Array indexing starts from zero, not one.",
    solution: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    cout << arr[3];

    return 0;
}`,
    checkPattern: /cout\s*<<\s*arr\s*\[\s*3\s*\]\s*;/,
  },
];

export default debugChallenges;
