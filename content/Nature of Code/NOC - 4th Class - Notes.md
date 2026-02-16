`if(isNaN(x0))` - asks if is not a number.
`get` & `set` for classes
```
// make a function
  /*
  getRadius(){
    return this.diameter / 2;
  }
  getArea(){
    return PI * pow(this.getRadius(), 2)
  }
  */
  
  get radius(){
    return this.diameter / 2;
  }
  
  get area(){
      return PI * pow(this.radius(), 2)
  }
```

`background(isGravity?220:100)` 