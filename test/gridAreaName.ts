function getGridAreaName(index) {
  const column = String.fromCharCode(97 + (index % 3)); // 'a', 'b', 'c', etc.
  const row = Math.floor(index / 3) + 1; // 1, 2, 3, etc.
  return column + row; // 'a1', 'b1', 'c1', 'a2', etc.
}
function testGetGridAreaName(testIndex, expected) {
  const result = getGridAreaName(testIndex);
  console.log(
    `Test for index ${testIndex}: ${
      result === expected ? "PASS" : "FAIL"
    }. Expected: ${expected}, got: ${result}`
  );
}

// Test Cases
testGetGridAreaName(0, "a1");
testGetGridAreaName(1, "b1");
testGetGridAreaName(2, "c1");
testGetGridAreaName(3, "a2");
testGetGridAreaName(4, "b2");
testGetGridAreaName(5, "c2");
testGetGridAreaName(6, "a3");
testGetGridAreaName(7, "b3");
