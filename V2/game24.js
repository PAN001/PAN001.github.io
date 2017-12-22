console.log("hello world");

// $('#gameButton').on('click', function (e) {
// 	e.preventDefault(); // To prevent following the link (optional)
// 	// get four inputs
// 	console.log("hello world2");
// 	var fourVals = $('#inlineFormInput').val();
// 	console.log(fourVals);

// })

function calcuate24() {
	// validate four numbers
	var one = $("#one").val();
	var two = $("#two").val();
	var three = $("#three").val();
	var four = $("#four").val();
	var nums = []
	nums[0] = parseInt(one);
	nums[1] = parseInt(two);
	nums[2] = parseInt(three);
	nums[3] = parseInt(four);


	for(i = 0;i < nums.length;i++) {
		if(nums[i] <= 0 || nums[i] > 13) {
			$('#ans').text("Invalid input :(");
			return;
		}
	}

	var res = judgePoint24(nums);
	if(res == null) {
		$('#ans').text("Ops. No solution :(");
	}
	else {
		$('#ans').text(res);
	}
}

function judgePoint24(nums) {
	var strs = [];
	for(i = 0;i < 4;i++) {
		strs[i] = nums[i] + "";
	}
    var res = f(nums, strs);
    return res;
}

function f(a, strs) {
    // console.log(strs);
    // console.log(a)
    if (a.length == 1) {
        if(a[0] == 24)
            return strs[0];
        else 
            return null;
    }

    for (var i = 0; i < a.length; i++) {
        for (var j = i + 1; j < a.length; j++) {
            var b = [];
            var bStrs = [];
            for (var k = 0, l = 0; k < a.length; k++) {
                if (k != i && k != j) {
                    b[l] = a[k];
                    bStrs[l] = strs[k];
                    l++;
                }
            }
            var strs2 = generateStrs(strs[i], strs[j]); 
            var computed = compute(a[i], a[j]);
            for (var m = 0;m < computed.length;m++) {
                var k = computed[m];
                b[a.length - 2] = k;
                bStrs[a.length - 2] = strs2[m];
                var res = f(b, bStrs);
                if (res != null) {
                    return res;
                }
            }
        }
    }
    
    return null;
}

function generateStrs(a, b) {
    return ["(" + a + "+" + b + ")","(" + a + "-" + b + ")", "(" + b + "-" + a + ")", "(" + a + "*" + b + ")", "(" + a + "/" + b + ")", "(" + b + "/" + a + ")"];
}
    
function compute(a, b) {
    return [a + b, a - b, b - a, a * b, a / b, b / a];
}