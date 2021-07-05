function getArrayIntersect<T>(arrayA : T[], arrayB : T[]) : T[]{
    return arrayA.filter((value:T)=>{
        return arrayB.includes(value);
    });
}